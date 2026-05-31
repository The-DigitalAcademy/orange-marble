import { DataTable } from "@/components/data-table";
import { FilterSelection } from "@/components/filter-selection";
import { fetchUngradedSubmissions } from "@/lib/data";
import { filterList, getFilteredListUniqueValues } from "@/lib/utils";
import { columns } from "./columns";
import { Suspense } from "react";
import { ColumnVisibility } from "@tanstack/react-table";

type PageProps = {
    searchParams?: Promise<{
        coursename?: string;
        activitytype?: string;
        activityname?: string;
        username?: string;
    }>
}

export default async function Page(props: PageProps) {
    const submissions = await fetchUngradedSubmissions();
    const searchParams = await props.searchParams;

    let filters = {
        coursename: searchParams?.coursename,
        activitytype: searchParams?.activitytype,
        activityname: searchParams?.activityname,
        username: searchParams?.username
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-7">
                <FilterSelection
                    keyName="coursename"
                    label="Course"
                    options={getFilteredListUniqueValues(submissions, {}, 'coursename').map(i => String(i))} />
                <FilterSelection
                    keyName="activityname"
                    label="Activity"
                    options={getFilteredListUniqueValues(submissions, { coursename: searchParams?.coursename }, 'activityname').map(i => String(i))} />
                <FilterSelection
                    keyName="activitytype"
                    label="Type"
                    options={getFilteredListUniqueValues(submissions, {}, 'activitytype').map(i => String(i))} />
                <FilterSelection
                    keyName="username"
                    label="User"
                    options={getFilteredListUniqueValues(submissions, {}, 'username').map(i => String(i))} />
            </div >
            <div className="">
                <DataTable columns={columns} data={filterList(submissions, filters)}
                    initialState={{ columnVisibility: {} }} />
            </div>

        </div>
    )
}
