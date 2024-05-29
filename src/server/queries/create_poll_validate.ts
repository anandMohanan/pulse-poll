import "server-only"
import { db } from "@/db"
import { PlanTable } from "@/db/schema/plan_schema"
import { PollTable } from "@/db/schema/poll_schema"
import { validateRequest } from "@/lib/validateRequest"
import { and, count, eq } from "drizzle-orm"

export const createPollValidate = async (): Promise<Boolean> => {
    const { user } = await validateRequest()
    const getPlanDetails = await db.select().from(PlanTable).where(eq(PlanTable.planId, user?.planId!)).get()
    const getPollCount = await db
        .select({ count: count() })
        .from(PollTable)
        .where(and(eq(PollTable.userId, user?.id!), eq(PollTable.createdAt, new Date().toISOString().split("T")[0]))).get()
    if (getPollCount?.count! < getPlanDetails?.createCount!) {
        return true
    }
    return false
}
