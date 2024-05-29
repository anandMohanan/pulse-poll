"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { SelectPoll } from "@/db/schema/poll_schema"
import { dislikePollAction, likePollAction } from "@/server/poll"
import { useMutation } from "@tanstack/react-query"
import { BookmarkIcon, ThumbsDown, ThumbsUp } from "lucide-react"

export const PollComponent = ({ pollData }: { pollData: { pollId: string, pollTitle: string, pollDescription: string, createdUser: string | null, createdAt: string | null } }) => {
    const { toast } = useToast()
    const { mutate: likePoll } = useMutation({
        mutationFn: async () => {

            await likePollAction({ pollId: pollData.pollId })
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
                title: "Poll liked",
                description: "We've liked your poll for you.",
                variant: "default",
            })
        }
    })
    const { mutate: dislikePoll } = useMutation({
        mutationFn: async () => {

            await dislikePollAction({ pollId: pollData.pollId })
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
                title: "Poll disliked",
                description: "We've disliked your poll for you.",
                variant: "default",
            })
        }
    })
    const { } = useMutation({
        mutationFn: async () => {
            //bookmark
        }
    })
    return (
        <Card className="w-[500px]">
            <CardHeader className="flex flex-row justify-between align-middle">
                <div>
                    <CardTitle>{pollData.pollTitle}</CardTitle>
                    <CardDescription>{pollData.pollDescription}</CardDescription>
                </div>
                <Button variant="outline" size="icon"><BookmarkIcon className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div>
                    <Button variant="ghost" size={"icon"} onClick={() => likePoll()}><ThumbsUp className="text-green-300" /></Button>
                    <Button variant={"ghost"} size={"icon"} onClick={() => dislikePoll()}><ThumbsDown className="text-red-300" /></Button>
                </div>
                <div>
                    <p>{pollData.createdUser}: {pollData.createdAt} </p>
                </div>
            </CardFooter>
        </Card>
    )
}
