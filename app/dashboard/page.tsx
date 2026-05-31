import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchDashboardMetrics } from "@/lib/data"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

export default async function Page() {

    const metrics = await fetchDashboardMetrics();

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Ungraded Submissions</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {metrics.ungradedSubmissions.total}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
                        <div className="flex items-end gap-2">
                            <p className="text-lg">{metrics.ungradedSubmissions.blocked}</p>
                            <p className="text-muted-foreground">blocked submissions</p>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Learner Performance</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {metrics.learnerPerformance.groups} <span className="font-normal text-sm">groups</span>
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
                        <div className="flex items-end gap-2">
                            <p className="text-lg">{metrics.learnerPerformance.activities}</p>
                            <p className="text-muted-foreground">Deliverables</p>
                        </div>
                        <div className="flex items-end gap-2">
                            <p className="text-lg">{metrics.learnerPerformance.learners}</p>
                            <p className="text-muted-foreground">Learners tracked</p>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="@container/card">
                    <CardHeader>
                        <CardDescription>Autograder</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {metrics.autograder.successRate.toFixed(2)}%
                            <span className="text-sm font-normal ml-2">success rate</span>
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm h-full">
                        <div className="flex items-end gap-2">
                            <p className="text-lg">{metrics.autograder.attemptAverage.toFixed(2)}</p>
                            <p className="text-muted-foreground">Average Attempts per submission</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>

    )
}
