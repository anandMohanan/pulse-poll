"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { SelectComment } from "@/db/schema/poll_schema"
import { primary_font, secondary_font } from "@/lib/font"
import { cn } from "@/lib/utils"
import { commentPollAction, deleteCommentAction } from "@/server/poll"
import { useMutation } from "@tanstack/react-query"
import { Loader2, TrashIcon } from "lucide-react"
import { useState } from "react"

export const PollCommentsComponent = ({ pollId, comments }: { pollId: string, comments: { comment: string, username: string | null, createdDate: string | null, commentId: string }[] }) => {
    const [comment, setComment] = useState("")
    const { toast } = useToast()
    const { mutate: commentPoll, isPending: isCommenting } = useMutation({
        mutationFn: async () => {
            await commentPollAction({ pollId, comment })
            setComment("")
        },
        onError(error, variables, context) {
            toast({
                title: error.message,
                description: "Please try again.",
                variant: "destructive",
            })
        },
        onSuccess: async () => {
            toast({
                title: "Comment deleted",
                description: "We've deleted your comment for you.",
                variant: "default",
            })
        }
    })
    const { mutate: deleteComment, isPending: isDeleting } = useMutation({
        mutationFn: async ({ commentId }: { commentId: string }) => {
            await deleteCommentAction({ commentId })
        },
        onError(error, variables, context) {
            toast({
                title: error.message,
                description: "Please try again.",
                variant: "destructive",
            })
        },
        onSuccess: async () => {
            toast({
                title: "Comment added",
                description: "We've added your comment for you.",
                variant: "default",
            })
        }
    })
    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle className={cn(primary_font.className)}>Comments</CardTitle>
                <CardDescription className={cn(secondary_font.className)}>Add a comment</CardDescription>
                <div className={cn("flex gap-2 ", secondary_font.className)}>
                    <Input placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full" />
                    <Button variant="default" disabled={isCommenting} onClick={() => commentPoll()}>{isCommenting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Post</Button>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[200px]">
                    <div className={cn("flex flex-col gap-2")}>
                        {
                            comments?.map((comment) => (
                                <div key={comment.commentId} className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className={cn("font-bold", primary_font.className)}>{comment.username}</h3>
                                            <p key={comment.commentId} className={cn("text-sm", secondary_font.className)}>{comment.comment}</p>
                                        </div>
                                        <Button variant="ghost" disabled={isDeleting} onClick={() => deleteComment({ commentId: comment.commentId })} size="icon"><TrashIcon className="h-4 w-4" /></Button>
                                    </div>
                                    <Separator className="my-4" />
                                </div>
                            ))
                        }
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>

    )
}
