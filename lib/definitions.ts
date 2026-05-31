export type SubmissionData = {
    id: number,
    submission_id: string,
    blocked: boolean,
    comment: string | null,
    created_at: string
}

export type UngradedSubmission = {
    id: string;
    coursename: string;
    activitytype: string;
    activityname: string;
    username: string;
    timemodified: number;
    coursepath: string;
    activitypath: string;
    gradepath: string;
}

export type extendedUngradedSubmission = UngradedSubmission & {
    blocked: boolean, comment: string
}

export type AutograderLog = {
    id: number;
    created_at: string;
    submission_id: number;
    status: string;
    details: string;
    attempt: number;
    data: any;
}

export type ActivityReport = {
    id: string;
    coursename: string;
    groupname: string;
    userid: number;
    firstname: string;
    lastname: string;
    activitytype: string;
    activityname: string;
    grade: number | null;
    duedate: number | null;
    submissiondate: number | null;
    submissionstatus: 'ontime' | 'pending' | 'missed' | 'late';
}