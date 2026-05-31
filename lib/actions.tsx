"use server";

import postgres from "postgres";
import { getSubmission } from "./data";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function setSubmissionBlockedStatus(submissionId: string, blocked: boolean) {
    try {
        const exists = await getSubmission(submissionId)
        if (exists) {
            await sql`UPDATE submissions SET blocked = ${blocked} WHERE submission_id = ${submissionId}`
        } else {
            await sql`INSERT INTO submissions (submission_id, blocked) VALUES (${submissionId}, ${blocked})`
        }
    } catch (error) {
        console.log(error)
        throw Error('failed to set submission blocked status')
    }
}

export async function setSubmissionComment(submissionId: string, comment: string) {
    try {
        const exists = await getSubmission(submissionId)
        if (exists) {
            await sql`UPDATE submissions SET comment = ${comment} WHERE submission_id = ${submissionId}`
        } else {
            await sql`INSERT INTO submissions (submission_id, comment) VALUES (${submissionId}, ${comment})`
        }
    } catch (error) {
        console.log(error)
        throw Error('failed to set submission blocked status')
    }
}