"use client";
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "./ui/textarea"
import { useState } from "react";
import { setSubmissionComment } from "@/lib/actions";
import { useDebouncedCallback } from "use-debounce";

export function CommentPopoverForm({ value, submissionId }: { value?: string, submissionId: string }) {

    const [comment, setComment] = useState(value);

    const handleCommentUpdate = useDebouncedCallback(() => {
        setSubmissionComment(submissionId, comment || "")
    }, 300)

    return (
        <Popover>
            <PopoverTrigger>
                <p className="whitespace-nowrap max-w-30 truncate">{comment || <span className='text-transparent'>empty</span>}</p>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
                <PopoverHeader>
                    <PopoverTitle>Comment</PopoverTitle>
                </PopoverHeader>
                <Field>
                    <Textarea
                        onChange={(e) => {
                            setComment(e.target.value)
                            handleCommentUpdate()
                        }}
                        value={comment}
                        placeholder="Type your comment here." />
                </Field>
            </PopoverContent>
        </Popover>
    )
}
