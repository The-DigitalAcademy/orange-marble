import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-7">
                <Skeleton className="w-48 h-8 rounded-lg" />
                <Skeleton className="w-48 h-8 rounded-lg" />
                <Skeleton className="w-48 h-8 rounded-lg" />
                <Skeleton className="w-48 h-8 rounded-lg" />
            </div>
            <Skeleton className="w-full h-140 rounded-lg" />
        </div>
    )
}
