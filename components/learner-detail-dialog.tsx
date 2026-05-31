import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ActivityReport } from "@/lib/definitions"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import clsx from "clsx"
import moment from "moment"
import { Separator } from "./ui/separator"

export function LearnerDetailDialog({ name, records }: { name: string, records: ActivityReport[] }) {

    const late = records.reduce((acc, curr) => {
        if (curr.submissionstatus == 'late') return acc + 1
        return acc;
    }, 0)
    const missed = records.reduce((acc, curr) => {
        if (curr.submissionstatus == 'missed') return acc + 1
        return acc;
    }, 0)
    const ontime = records.reduce((acc, curr) => {
        if (curr.submissionstatus == 'ontime') return acc + 1
        return acc;
    }, 0)
    const pending = records.reduce((acc, curr) => {
        if (curr.submissionstatus == 'pending') return acc + 1
        return acc;
    }, 0)
    return (
        <Dialog>
            <DialogTrigger>
                <p className="hover:underline cursor-pointer">{name}</p>
            </DialogTrigger>
            <DialogContent className="min-w-[80vw]">
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                    <DialogDescription>
                        <p className="mb-2">{records[0].groupname}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-700">
                            <div>On Time: {ontime}</div>
                            <Separator orientation='vertical' />
                            <div>Late: {late}</div>
                            <Separator orientation='vertical' />
                            <div>Missed: {missed}</div>
                            <Separator orientation='vertical' />
                            <div>Pending: {pending}</div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[80vh] overflow-y-auto p-4 grid grid-cols-3 gap-6">
                    {records.sort((a, b) => (a.duedate || 0) - (b.duedate || 0)).map((record, index) => {
                        const submissionStatus = record?.submissionstatus
                        const submissionDate = record?.submissiondate ? new Date(record?.submissiondate * 1000) : null
                        const dueDate = record?.duedate ? new Date(record?.duedate * 1000) : null
                        return (
                            <Card className="h-30 rounded-lg justify-between pt-0 overflow-visible">
                                <CardHeader className="bg-slate-50 pt-4 border-b relative">
                                    <Badge variant={"secondary"} className="absolute -left-2 -top-2 text-[10px] border">{index + 1}</Badge>
                                    <CardTitle className="truncate text-sm" title={record.activityname}>{record.activityname}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Badge
                                                variant={record.submissionstatus == 'pending' ? "secondary" : "default"}
                                                className={clsx({
                                                    "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300": record.submissionstatus == 'ontime',
                                                    "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300": record.submissionstatus == 'missed',
                                                    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300": record.submissionstatus == 'late',

                                                })}
                                            >{record.submissionstatus}</Badge>
                                            <p className="text-xs">
                                                {(submissionDate && submissionStatus == 'ontime') && <span>{`submitted ${moment(submissionDate).fromNow()}`}</span>}
                                                {(submissionStatus == 'missed' && dueDate) && <span>{`due ${moment(dueDate).fromNow()}`}</span>}
                                                {(submissionStatus == 'pending' && dueDate) && <span>{`due ${moment(dueDate).fromNow()}`}</span>}
                                                {(submissionStatus == 'late' && dueDate && submissionDate) && <span>{`${moment(submissionDate).diff(moment(dueDate), 'days')} days late`}</span>}
                                            </p>
                                        </div>

                                        {record.grade ? (
                                            <p className="text-xs">Grade: {record.grade}%</p>
                                        ) : ''}
                                    </div>

                                </CardContent>
                            </Card>)
                    })}
                </div>
            </DialogContent>
        </Dialog>
    )
}
