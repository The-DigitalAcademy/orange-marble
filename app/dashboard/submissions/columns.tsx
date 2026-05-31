"use client"

import { CommentPopoverForm } from "@/components/comment-popover-form"
import { Switch } from "@/components/ui/switch"
import { setSubmissionBlockedStatus } from "@/lib/actions"
import { extendedUngradedSubmission } from "@/lib/definitions"
import { IconExternalLink } from "@tabler/icons-react"
import { ColumnDef } from "@tanstack/react-table"
import clsx from "clsx"
import moment from "moment"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<extendedUngradedSubmission>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ cell }) => `${cell.getValue()}`.toUpperCase()

    },
    {
        accessorKey: "coursename",
        header: "Course",
        cell: ({ cell }) => <div className="max-w-45 truncate">{`${cell.getValue()}`}</div>
    },
    {
        accessorKey: "activityname",
        header: "Activty",
        cell: ({ cell }) => <div className="max-w-60 truncate">{`${cell.getValue()}`}</div>
    },
    {
        accessorKey: "activitytype",
        header: "Type",
        cell: ({ cell }) => (<span
            className={clsx(
                "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium inset-ring mr-auto",
                { 'inset-ring-orange-600/20 text-orange-700 bg-orange-50': cell.getValue() == 'assign' },
                { 'inset-ring-purple-600/20 text-purple-700 bg-purple-50': cell.getValue() == 'quiz' }
            )}>
            {`${cell.getValue()}`}
        </span>)
    },
    {
        accessorKey: "username",
        header: "Learner",
        cell: ({ cell }) => <div className="max-w-45 truncate">{`${cell.getValue()}`}</div>
    },
    {
        accessorKey: "timemodified",
        header: "Submitted",
        cell: ({ cell }) => {
            const timestamp = Number(cell.getValue())
            return moment(new Date(timestamp * 1000)).fromNow()
        }
    },
    {
        accessorKey: "blocked",
        header: "Blocked",
        cell: ({ cell, row }) => <Switch
            defaultChecked={!!cell.getValue()}
            onCheckedChange={(checked) => setSubmissionBlockedStatus(row.getValue("id"), checked)} />
    },
    {
        accessorKey: "comment",
        header: "Comment",
        cell: ({ row }) => {
            return (
                <CommentPopoverForm submissionId={row.getValue("id")} value={row.getValue("comment")} />)
        }
    },
    {
        accessorKey: "gradepath",
        header: "Grade",
        cell: ({ row }) => <a target="_blank" href={row.getValue("gradepath")} className="text-blue-400"><IconExternalLink /></a>
    },
]