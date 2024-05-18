import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { UserTable } from "./user_schema";

export const PollTable = sqliteTable("poll", {
    pollId: text("poll_id").notNull().primaryKey().$defaultFn(() => createId()),
    title: text("title").notNull(),
    pollLike: integer("poll_like").notNull(),
    pollDislike: integer("poll_dislike").notNull(),
    description: text("description").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_DATE`),
    lastmodifiedAt: text("lastmodified_at").default(sql`CURRENT_DATE`),
    userId: text("user_id").references(() => UserTable.userId),
})

export const UserPollActionTable = sqliteTable("user_poll_action", {
    userPollActionId: text("user_poll_action_id").notNull().primaryKey().$defaultFn(() => createId()),
    userId: text("user_id").references(() => UserTable.userId),
    pollId: text("poll_id").references(() => PollTable.pollId),
    createdDate: text("created_date").default(sql`CURRENT_DATE`),
})


export const CommentTable = sqliteTable("comment", {
    commentId: text("comment_id").notNull().primaryKey().$defaultFn(() => createId()),
    pollId: text("poll_id").references(() => PollTable.pollId),
    userId: text("user_id").references(() => UserTable.userId),
    comment: text("comment").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_DATE`),
    lastmodifiedAt: text("lastmodified_at").default(sql`CURRENT_DATE`),
})
