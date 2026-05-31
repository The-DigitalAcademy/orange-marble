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

export function CommentPopoverForm({ value, submissionId }: { value?: string, submissionId: string }) {

    const [comment, setComment] = useState(value);
    const [updated, setUpdated] = useState(false)

    return (
        <Popover onOpenChange={(open) => {
            if (!open && updated == false) setComment(value)
            if (open) setUpdated(false)
        }}>
            <PopoverTrigger>
                <p className="whitespace-nowrap max-w-30 truncate">{comment || <span className='text-transparent'>empty</span>}</p>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
                <PopoverHeader>
                    <PopoverTitle>Comment</PopoverTitle>
                </PopoverHeader>
                <Field>
                    <Textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        placeholder="Type your comment here." />
                    <Button
                        onClick={() => setSubmissionComment(submissionId, comment || "")
                            .then(() => setUpdated(true))
                            .catch(() => setUpdated(false))
                        }
                    >
                        save changes
                    </Button>
                </Field>
            </PopoverContent>
        </Popover>
    )
}
