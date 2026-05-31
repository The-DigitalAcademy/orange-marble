import { LearnerDetailDialog } from "@/components/learner-detail-dialog";
import { ActivityReport } from "@/lib/definitions"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<{ userid: number, username: string, records: ActivityReport[] }>[] = [
    {
        accessorKey: "username",
        header: "Name",
        cell: ({ row }) => (
            <LearnerDetailDialog name={row.getValue("username")} records={row.getValue("records")} />
        )
    },
    {
        accessorKey: "records",
        header: "Completed",
        cell: ({ row }) => {
            const records: ActivityReport[] = row.getValue("records");
            const totalActivites = records.length
            const completed = records.reduce((acc, curr) => {
                if (curr.submissionstatus == 'ontime' || curr.submissionstatus == 'late') return acc + 1;
                return acc;
            }, 0)

            return <>{completed}/{totalActivites}</>

        }
    },
    {
        accessorKey: "records",
        header: "Late",
        cell: ({ row }) => {
            const records: ActivityReport[] = row.getValue("records");
            const late = records.reduce((acc, curr) => {
                if (curr.submissionstatus == 'late') return acc + 1
                return acc;
            }, 0)

            return <>{late}</>

        }
    },
    {
        accessorKey: "records",
        header: "Missed",
        cell: ({ row }) => {
            const records: ActivityReport[] = row.getValue("records");
            const missed = records.reduce((acc, curr) => {
                if (curr.submissionstatus == 'missed') return acc + 1
                return acc;
            }, 0)

            return <>{missed}</>

        }
    },
    {
        accessorKey: "records",
        header: "Strikes",
        cell: ({ row }) => {
            const records: ActivityReport[] = row.getValue("records");
            const missed = records.reduce((acc, curr) => {
                if (curr.submissionstatus == 'missed') return acc + 1
                return acc;
            }, 0)
            const late = records.reduce((acc, curr) => {
                if (curr.submissionstatus == 'late') return acc + 1
                return acc;
            }, 0)

            return <>{missed + late}</>

        }
    }
]