import { DataTable } from "@/components/data-table";
import { fetchAutograderLogs } from "@/lib/data";
import { columns } from "./columns";

export default async function Page() {

    const data = await fetchAutograderLogs()
    return (
        <div>
            <DataTable data={data} columns={columns} />
        </div>
    )
}
