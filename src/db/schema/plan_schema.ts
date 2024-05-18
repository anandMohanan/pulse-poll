import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const PlanTable = sqliteTable("plan", {
    planId: text("plan_id").notNull().primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    createCount: integer("create_count").notNull(),
    viewCount: integer("view_count").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_DATE`),
    lastmodifiedAt: text("lastmodified_at").default(sql`CURRENT_DATE`),
})
