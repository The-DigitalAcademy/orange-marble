import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export function DetailHoverCard({ details }: { details: string }) {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <p className="whitespace-nowrap max-w-30 truncate cursor-default hover:underline">{details}</p>
            </HoverCardTrigger>
            <HoverCardContent className="max-h-50 overflow-scroll">
                <code className="break-words">
                    {details}
                </code>
            </HoverCardContent>
        </HoverCard>
    )
}
