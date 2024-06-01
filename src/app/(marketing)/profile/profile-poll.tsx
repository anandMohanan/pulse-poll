import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { primary_font, secondary_font } from "@/lib/font";
import { cn } from "@/lib/utils";
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
                    <CardTitle className={cn(primary_font.className)}>{pollData.pollTitle}</CardTitle>
                    <CardDescription className={cn(secondary_font.className)}>{pollData.pollDescription}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex flex-row gap-6">
                    <p className={cn("flex text-green-500", secondary_font.className)}><ArrowUp /> {pollData.pollLikes}</p>
                    <p className={cn("flex text-red-500", secondary_font.className)}><ArrowDown /> {pollData.pollDislikes}</p>
                </div>
                <div>
                    <p className={cn(secondary_font.className)}> {pollData.createdAt} </p>
                </div>
            </CardFooter>
        </Card>
    )
};
