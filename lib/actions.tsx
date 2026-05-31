"use server";

import postgres from "postgres";
import { getSubmission } from "./data";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function setSubmissionBlockedStatus(submissionId: string, blocked: boolean) {
    try {
        const exists = await getSubmission(submissionId)
        if (exists) {
            await sql`UPDATE submissions SET blocked = ${blocked} WHERE submission_id = ${submissionId}`
            // const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions?submission_id=eq.${submissionId}`, {
            //     method: 'PATCH',
            //     headers: {
            //         'apiKey': process.env.SUPABASE_ANON_KEY || '',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ blocked })
            // });

            // if (!response.ok) {
            //     throw new Error(`PATCH failed: ${response.status} ${await response.text()}`);
            // }
        } else {
            await sql`INSERT INTO submissions (submission_id, blocked) VALUES (${submissionId}, ${blocked})`
            // const payload = {
            //     submission_id: submissionId,
            //     blocked: blocked ?? false
            // };
            // const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions`, {
            //     method: 'POST',
            //     headers: {
            //         'apiKey': process.env.SUPABASE_ANON_KEY || '',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(payload)
            // });

            // if (!response.ok) {
            //     throw new Error(`POST failed: ${response.status} ${await response.text()}`);
            // }
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

            // const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions?submission_id=eq.${submissionId}`, {
            //     method: 'PATCH',
            //     headers: {
            //         'apiKey': process.env.SUPABASE_ANON_KEY || '',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ comment })
            // });

            // if (!response.ok) {
            //     throw new Error(`PATCH failed: ${response.status} ${await response.text()}`);
            // }
        } else {
            await sql`INSERT INTO submissions (submission_id, comment) VALUES (${submissionId}, ${comment})`

            // const payload = {
            //     submission_id: submissionId,
            //     comment: comment ?? null
            // };
            // const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions`, {
            //     method: 'POST',
            //     headers: {
            //         'apiKey': process.env.SUPABASE_ANON_KEY || '',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(payload)
            // });

            // if (!response.ok) {
            //     throw new Error(`POST failed: ${response.status} ${await response.text()}`);
            // }
        }
    } catch (error) {
        console.log(error)
        throw Error('failed to set submission blocked status')
    }
}