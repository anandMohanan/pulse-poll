import { SelectUser, SessionsTable, UserTable } from "@/db/schema/user_schema";
import { Client } from "@libsql/client"
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite"
import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { db } from "@/db";


const adapter = new DrizzleSQLiteAdapter(db, SessionsTable, UserTable)


export const lucia = new Lucia(
    adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes(databaseUserAttributes) {
        return {
            email: databaseUserAttributes.email,
            username: databaseUserAttributes.username,
            planId: databaseUserAttributes.planId,
            userId: databaseUserAttributes.id

        }
    },
}
)



declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: SelectUser
    }
}
