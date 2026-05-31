"use client"


import { DetailHoverCard } from "@/components/detail-hover-card"
import { AutograderLog } from "@/lib/definitions"
import { IconExternalLink } from "@tabler/icons-react"
import { ColumnDef } from "@tanstack/react-table"
import clsx from "clsx"
import moment from "moment"

export const columns: ColumnDef<AutograderLog>[] = [
    {
        accessorKey: "created_at",
        header: "Timestamp",
        cell: ({ row }) => moment(row.getValue("created_at")).format("YYYY-MM-DD HH:mm")
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (<span
            className={clsx(
                "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium inset-ring mr-auto",
                { 'inset-ring-red-600/20 text-red-700 bg-red-50': row.getValue("status") == 'fail' },
                { 'inset-ring-green-600/20 text-green-700 bg-green-50': row.getValue("status") == 'success' }
            )}>
            {row.getValue("status")}
        </span>)
    },
    {
        accessorKey: "attempt",
        header: "Attempt",
    },
    {
        accessorKey: "details",
        header: "Status Details",
        cell: ({ row }) => (<DetailHoverCard details={row.getValue("details")} />)
    },
    {
        accessorKey: "data",
        header: "Payload",
        cell: ({ row }) => (<DetailHoverCard details={JSON.stringify(row.getValue("data"))} />)
    },
    {
        accessorKey: "user_id",
        header: "View Submission",
        cell: ({ row }) => {
            const submissionData: { cmid?: number, userid?: number } = row.getValue("data") || {}
            return (<a
                target="_blank"
                className="text-blue-400  hover:text-blue-500"
                href={`https://moodle.shaper.co.za/mod/assign/view.php?id=${submissionData?.cmid}&action=grader&userid=${submissionData?.userid}`}>
                <IconExternalLink />
            </a>)
        }
    }
]