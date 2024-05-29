import { db } from "@/db"
import { PollTable } from "@/db/schema/poll_schema"
import { validateRequest } from "@/lib/validateRequest"
import { count, eq, sum } from "drizzle-orm"

export const get_userProfileDetails = async () => {
    const { user } = await validateRequest()
    return await db.select({
        pollCounts: count(PollTable.pollId),
        pollLikes: sum(PollTable.pollLike),
        pollDislikes: sum(PollTable.pollDislike)
    }).from(PollTable).where(
        eq(PollTable.userId, user?.id!)
    ).get()
}
