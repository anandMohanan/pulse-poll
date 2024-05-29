import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import { PollTable } from "@/db/schema/poll_schema";
import { validateRequest } from "@/lib/validateRequest";
import { eq } from "drizzle-orm";
import { ProfilePollComponent } from "./profile-poll";
import { get_profilePollDetails } from "@/server/queries/poll_queries";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { get_userProfileDetails } from "@/server/queries/user_queries";

const ProfilePage = async () => {
    const { user } = await validateRequest()
    const profilePollDetails = await get_profilePollDetails()
    const userProfileDetails = await get_userProfileDetails()
    return <div>
        <div className="p-10">
            <Card className="">
                <CardHeader className="flex flex-row justify-between align-middle">
                    <div className="flex flex-col">
                        <CardTitle className="text-3xl">{user?.username}</CardTitle>
                        <CardDescription className=" text-lg text-yellow-300">Plan ID: {user?.planId == "1" ? "Free" : "Premium"}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <CardTitle className="">Number of polls:</CardTitle>
                            <CardDescription className="text-yellow-300">{userProfileDetails?.pollCounts}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <CardTitle className="">Likes:</CardTitle>
                            <CardDescription className="text-yellow-300">{userProfileDetails?.pollLikes}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <CardTitle className="">Dislikes:</CardTitle>
                            <CardDescription className="text-yellow-300">{userProfileDetails?.pollDislikes}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                </CardFooter>
            </Card>
        </div>
        <Tabs defaultValue="account" className="">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts"> Your Polls</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                    {
                        profilePollDetails.map((poll) => {
                            return <ProfilePollComponent key={poll.pollId} pollData={poll} />
                        })
                    }
                </div>
            </TabsContent>
            <TabsContent value="bookmarks">
            </TabsContent>
        </Tabs>
    </div>;
};

export default ProfilePage;
