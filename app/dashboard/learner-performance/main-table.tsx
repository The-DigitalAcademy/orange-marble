"use client";

import { DataTable } from "@/components/data-table";
import { ActivityReport } from "@/lib/definitions";
import { columns } from "./columns";

export default function MainTable({ records }: { records: { userid: number, username: string, records: ActivityReport[] }[] }) {
    return (
        <div>
            <DataTable data={records} columns={columns} />
        </div>
    )
}
