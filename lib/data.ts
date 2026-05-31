import postgres from "postgres";
import { ActivityReport, AutograderLog, extendedUngradedSubmission, SubmissionData, UngradedSubmission } from "./definitions";
import { getFilteredListUniqueValues } from "./utils";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchUngradedSubmissions(): Promise<extendedUngradedSubmission[]> {
    let response;
    try {
        const webServiceFunction = 'local_grades_get_ungraded_submissions';
        response = await fetch(`${process.env.MOODLE_URL}/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=${webServiceFunction}&moodlewsrestformat=json`)

        if (!response.ok) {
            throw new Error(`Moodle Http Error: ${response.status} ${response.json()}`);
        }
    } catch (error) {
        console.error('Moodle Error:', error);
        throw new Error('Failed to fetch ungraded submissions data.');
    }

    const result: UngradedSubmission[] = await response.json();
    if (!Array.isArray(result)) {
        console.error('Moodle Error:', response);
        throw new Error('Failed to fetch ungraded submissions data.');
    }

    let submissionDataMap: Map<string, SubmissionData> = new Map();
    try {
        const submissionsData = await fetchSubmissionsData()
        submissionDataMap = new Map(submissionsData.map(s => [s.submission_id, s]))
    } catch (error) {
        console.error('Failed to fetch submission data:', response);
    }

    return result.map(item => {
        const data = submissionDataMap.get(`${item.id}`)
        return {
            ...item,
            coursepath: process.env.MOODLE_URL + item.coursepath,
            activitypath: process.env.MOODLE_URL + item.activitypath,
            gradepath: process.env.MOODLE_URL + item.gradepath,
            blocked: typeof data?.blocked == 'boolean' ? data.blocked : false,
            comment: data?.comment || ''
        }
    }).sort((a, b) => a.timemodified - b.timemodified)

}

export async function fetchSubmissionsData(): Promise<SubmissionData[]> {
    let response;
    try {
        const data = await sql<SubmissionData[]>`SELECT * FROM submissions`;
        return data;
        // response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions`, {
        //     headers: { 'apiKey': process.env.SUPABASE_ANON_KEY || '' }
        // })

        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status} ${await response.text()}`);
        // }
        // return await response.json();
    } catch (error) {
        console.error('Moodle Error:', response);
        throw new Error('Failed to fetch activity reports data.');
    }
}

export async function getSubmission(submissionId: string): Promise<SubmissionData | null> {
    try {
        const data = await sql<SubmissionData[]>`SELECT * FROM submissions WHERE submissions.submission_id = ${submissionId}`;
        return data[0];
        // const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions?submission_id=eq.${submissionId}&limit=1`, {
        //     headers: { 'apiKey': process.env.SUPABASE_ANON_KEY || '' }
        // });
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status} ${await response.text()}`);
        // };
        // const data = await response.json();
        // return data.length > 0 ? data[0] : null;
    } catch (error) {
        return null;
    }
}

export async function fetchAutograderLogs(): Promise<AutograderLog[]> {
    let response;
    try {
        const data = await sql<AutograderLog[]>`SELECT * FROM autograder_logs`;
        return data;
        // response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/autograde_worker_log`, {
        //     headers: { 'apiKey': process.env.SUPABASE_ANON_KEY || '' }
        // })

        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status} ${await response.text()}`);
        // }
        // return await response.json();
    } catch (error) {
        console.error('Moodle Error:', response);
        throw new Error('Failed to fetch activity reports data.');
    }
}

export async function fetchActivtyReports(): Promise<ActivityReport[]> {
    let response;
    try {
        const webServiceFunction = 'local_grades_get_activity_reports';
        response = await fetch(`${process.env.MOODLE_URL}/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=${webServiceFunction}&moodlewsrestformat=json`)

        if (!response.ok) {
            throw new Error(`Moodle Http Error: ${response.status} ${response.json()}`);
        }
    } catch (error) {
        console.error('Moodle Error:', error);
        throw new Error('Failed to fetch activity reports data.');
    }

    const result: ActivityReport[] = await response.json();
    if (!Array.isArray(result)) {
        console.error('Moodle Error:', response);
        throw new Error('Failed to fetch activity reports data.');
    }

    return result;
}

export async function fetchDashboardMetrics() {

    const metrics = {
        ungradedSubmissions: {
            total: 0,
            blocked: 0,
        },
        autograder: {
            successRate: 0,
            failRate: 0,
            attemptAverage: 0
        },
        learnerPerformance: {
            groups: 0,
            learners: 0,
            activities: 0
        }
    }

    const ungraded = await fetchUngradedSubmissions()
    metrics.ungradedSubmissions.total = ungraded.length
    metrics.ungradedSubmissions.blocked = ungraded.filter(i => i.blocked).length

    const autograder = await fetchAutograderLogs()
    metrics.autograder.successRate = (autograder.filter(i => i.status == 'success').length / autograder.length) * 100
    metrics.autograder.failRate = (autograder.filter(i => i.status == 'fail').length / autograder.length) * 100
    metrics.autograder.attemptAverage = autograder.reduce((acc, curr) => acc + (curr.attempt || 0), 0) / autograder.length

    const reports = await fetchActivtyReports()
    metrics.learnerPerformance.groups = getFilteredListUniqueValues(reports, {}, 'groupname').length
    metrics.learnerPerformance.learners = getFilteredListUniqueValues(reports, {}, 'userid').length
    metrics.learnerPerformance.activities = getFilteredListUniqueValues(reports, {}, 'activityname').length

    return metrics;

}