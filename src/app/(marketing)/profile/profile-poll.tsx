import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

export const ProfilePollComponent = ({ pollData }: {
    pollData: {
        pollLikes: number, pollDislikes: number, pollId: string, pollTitle: string, pollDescription: string,
        createdAt: string | null
    }
}) => {
    return (

        <Card className="w-[400px]">
            <CardHeader className="flex flex-row justify-between align-middle">
                <div>
                    <CardTitle>{pollData.pollTitle}</CardTitle>
                    <CardDescription>{pollData.pollDescription}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex flex-row gap-6">
                    <p className="flex text-green-500"><ArrowUp /> {pollData.pollLikes}</p>
                    <p className="flex text-red-500"><ArrowDown /> {pollData.pollDislikes}</p>
                </div>
                <div>
                    <p> {pollData.createdAt} </p>
                </div>
            </CardFooter>
        </Card>
    )
};
