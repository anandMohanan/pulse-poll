"use server"

import { db } from "@/db";
import { CommentTable, PollTable, UserPollActionTable } from "@/db/schema/poll_schema";
import { validateRequest } from "@/lib/validateRequest";
import { CreatePollType } from "@/types/poll_types";
import { createPollValidate } from "./queries/create_poll_validate";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { increment } from "@/lib/utils";

export const createPollAction = async ({ values }: { values: CreatePollType }) => {
    try {
        const { user } = await validateRequest()
        const canCreate = await createPollValidate()
        if (canCreate) {
            const { pollTitle, pollDescription } = values
            await db.insert(PollTable).values({
                title: pollTitle,
                description: pollDescription,
                userId: user?.id
            })
            revalidatePath("/profile")
        } else {
            throw new Error("You cannot create Polls because you have reached your daily limit. Please head over to Pricing page to upgrade your plan.")
        }
    }
    catch (e) {
        throw new Error(e.message)
    }

}



export const likePollAction = async ({ pollId }: { pollId: string }) => {
    try {
        const { user } = await validateRequest()
        const hasLiked = await
            db.select().from(UserPollActionTable).where(and(eq(UserPollActionTable.pollId, pollId), eq(UserPollActionTable.userId, user?.id!))).get()
        if (hasLiked) {
            throw new Error("Already an action is done against this poll.")
        }
        await db.insert(UserPollActionTable).values({
            pollId: pollId,
            userId: user?.id
        })
        await db.update(PollTable).set({
            pollLike: increment(PollTable.pollLike)
        })
        revalidatePath("/polls")
    } catch (e) {
        console.log(e)
        throw new Error(e.message)
    }
}

export const dislikePollAction = async ({ pollId }: { pollId: string }) => {
    try {
        const { user } = await validateRequest()
        const hasdisLiked = await
            db.select().from(UserPollActionTable).where(and(eq(UserPollActionTable.pollId, pollId), eq(UserPollActionTable.userId, user?.id!))).get()
        if (hasdisLiked) {
            throw new Error("Already an action is done against this poll.")
        }
        await db.insert(UserPollActionTable).values({
            pollId: pollId,
            userId: user?.id
        })
        await db.update(PollTable).set({
            pollDislike: increment(PollTable.pollDislike)
        })
        revalidatePath("/polls")
    } catch (e) {
        throw new Error(e.message)
    }
}

export const commentPollAction = async ({ pollId, comment }: { pollId: string, comment: string }) => {
    try {
        const { user } = await validateRequest()
        await db.insert(CommentTable).values({
            pollId: pollId,
            userId: user?.id,
            comment: comment
        })
        revalidatePath("/polls")
    } catch (e) {
        throw new Error(e.message)
    }
}

export const deleteCommentAction = async ({ commentId }: { commentId: string }) => {
    try {
        const { user } = await validateRequest()
        await db.delete(CommentTable).where(and(eq(CommentTable.commentId, commentId), eq(CommentTable.userId, user?.id!)))
        revalidatePath("/polls")
    } catch (e) {
        throw new Error(e.message)
    }
}
