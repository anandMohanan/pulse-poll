import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { UserTable } from "./user_schema";

export const PollTable = sqliteTable("poll", {
    pollId: text("poll_id").notNull().primaryKey().$defaultFn(() => createId()),
    title: text("title").notNull(),
    pollLike: integer("poll_like").notNull().default(0),
    pollDislike: integer("poll_dislike").notNull().default(0),
    description: text("description").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_DATE`),
    lastmodifiedAt: text("lastmodified_at").default(sql`CURRENT_DATE`),
    userId: text("user_id").references(() => UserTable.id),
})

export type SelectPoll = typeof PollTable.$inferSelect

export const UserPollActionTable = sqliteTable("user_poll_action", {
    userPollActionId: text("user_poll_action_id").notNull().primaryKey().$defaultFn(() => createId()),
    userId: text("user_id").references(() => UserTable.id),
    pollId: text("poll_id").references(() => PollTable.pollId),
    createdDate: text("created_date").default(sql`CURRENT_DATE`),
})


export const CommentTable = sqliteTable("comment", {
    commentId: text("comment_id").notNull().primaryKey().$defaultFn(() => createId()),
    pollId: text("poll_id").references(() => PollTable.pollId),
    userId: text("user_id").references(() => UserTable.id),
    comment: text("comment").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_DATE`),
    lastmodifiedAt: text("lastmodified_at").default(sql`CURRENT_DATE`),
})
export type SelectComment = typeof CommentTable.$inferSelect
