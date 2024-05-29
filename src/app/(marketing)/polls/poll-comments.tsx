"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { SelectComment } from "@/db/schema/poll_schema"
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
                <CardTitle>Comments</CardTitle>
                <CardDescription>Add a comment</CardDescription>
                <div className="flex gap-2 ">
                    <Input placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full" />
                    <Button variant="default" disabled={isCommenting} onClick={() => commentPoll()}>{isCommenting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Post</Button>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[200px]">
                    <div className="flex flex-col gap-2">
                        {
                            comments?.map((comment) => (
                                <div key={comment.commentId} className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-bold">{comment.username}</h3>
                                            <p key={comment.commentId}>{comment.comment}</p>
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
