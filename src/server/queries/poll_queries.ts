import "server-only"
import { db } from "@/db";
import { CommentTable, PollTable, UserPollActionTable } from "@/db/schema/poll_schema";
import { UserTable } from "@/db/schema/user_schema";
import { validateRequest } from "@/lib/validateRequest";
import { and, eq, ne, notExists } from "drizzle-orm";

export const get_pollDetailsforUsers = async () => {
    const { user } = await validateRequest()
    return await
        db
            .selectDistinct({
                pollTitle: PollTable.title,
                createdUser: UserTable.username,
                createdAt: PollTable.createdAt,
                pollDescription: PollTable.description,
                pollId: PollTable.pollId
            })
            .from(PollTable)
            .leftJoin(UserTable, eq(UserTable.id, PollTable.userId))
            .where(
                and(
                    ne(PollTable.userId, user?.id!),
                    notExists(
                        db
                            .select()
                            .from(UserPollActionTable)
                            .where(
                                and(
                                    eq(UserPollActionTable.userId, user?.id!),
                                    eq(UserPollActionTable.pollId, PollTable.pollId)
                                )
                            )
                    )
                )
            )
            .get();
}

export const get_pollComments = async ({ pollId }: { pollId: string }) => {
    return await db.select({
        comment: CommentTable.comment,
        username: UserTable.username,
        createdDate: CommentTable.createdAt,
        commentId: CommentTable.commentId
    })
        .from(CommentTable)
        .leftJoin(UserTable, eq(UserTable.id, CommentTable.userId))
        .where(eq(CommentTable.pollId, pollId))
}


export const get_profilePollDetails = async () => {

    const { user } = await validateRequest()

    return await db
        .selectDistinct({
            pollTitle: PollTable.title,
            createdAt: PollTable.createdAt,
            pollDescription: PollTable.description,
            pollId: PollTable.pollId,
            pollLikes: PollTable.pollLike,
            pollDislikes: PollTable.pollDislike
        })
        .from(PollTable)
        .where(
            eq(PollTable.userId, user?.id!)
        )

}
