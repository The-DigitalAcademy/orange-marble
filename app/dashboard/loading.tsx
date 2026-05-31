import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <div className="flex gap-4">
                <Skeleton className="w-full h-50 rounded-lg" />
                <Skeleton className="w-full h-50 rounded-lg" />
                <Skeleton className="w-full h-50 rounded-lg" />
            </div>
        </div>
    )
}
