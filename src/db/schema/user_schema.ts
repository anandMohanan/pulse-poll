import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { PlanTable } from "./plan_schema";

export const UserTable = sqliteTable("users", {
    id: text("user_id").notNull().primaryKey().$defaultFn(() => createId()),
    username: text("username").notNull(),
    password: text("password").notNull(),
    email: text("email").notNull(),
    planId: text("plan_id").references(() => PlanTable.planId).default("1"),
    createdAt: text("created_at").default(sql`CURRENT_DATE`),
    lastmodifiedAt: text("lastmodified_at").default(sql`CURRENT_DATE`),
})

export type InsertUser = typeof UserTable.$inferInsert
export type SelectUser = typeof UserTable.$inferSelect

export const SessionsTable = sqliteTable("sessions", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => UserTable.id),
    expiresAt: integer("expires_at").notNull()
})
