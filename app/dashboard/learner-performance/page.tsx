import { FilterSelection } from "@/components/filter-selection";
import { fetchActivtyReports } from "@/lib/data";
import { ActivityReport } from "@/lib/definitions";
import { getFilteredListUniqueValues } from "@/lib/utils";
import MainTable from "./main-table";

type PageProps = {
    searchParams?: Promise<{
        groupname?: string;
    }>
}
export default async function Page(props: PageProps) {
    const searchParams = await props.searchParams;
    const data = await fetchActivtyReports()

    const learnerIds = getFilteredListUniqueValues(data, { groupname: searchParams?.groupname }, 'userid').map(i => Number(i))
    const activities = getFilteredListUniqueValues(data, { groupname: searchParams?.groupname }, 'activityname')

    const tableRecords = learnerIds.map(id => {
        const learnerActivities: ActivityReport[] = []
        activities.forEach(activity => {
            const activityData = data.find(record => record.userid == id && record.activityname == activity)
            if (activityData) learnerActivities.push(activityData)
        });
        return {
            userid: id,
            username: `${learnerActivities[0].firstname} ${learnerActivities[0].lastname}`,
            records: learnerActivities
        }
    })
    return (
        <div className="flex flex-col gap-10">
            <FilterSelection keyName="groupname" label="Group" options={getFilteredListUniqueValues(data, {}, 'groupname').map(i => String(i))} />
            <MainTable records={tableRecords} />
        </div>
    )
}
