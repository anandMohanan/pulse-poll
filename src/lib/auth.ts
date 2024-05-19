import { db } from "@/db"
import { UserTable } from "@/db/schema/user_schema"
import { signInSchema, signUpSchema } from "@/types/user_types"
import { and, eq } from "drizzle-orm"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
                userName: {}
            },
            authorize: async (credentials) => {
                const { email, password } = await signInSchema.parseAsync(credentials)
                let user = null;
                let hashedPassword = "23233" //haspassword
                user = await db.select({
                    email: UserTable.email,
                    password: UserTable.password,
                    userName: UserTable.username
                }).from(UserTable).where(and(eq(UserTable.email, email), eq(UserTable.password, hashedPassword)))
                if (!user || user.length === 0) {
                    //do registration
                    const { email, password, userName } = await signUpSchema.parseAsync(credentials)
                    user = await db.insert(UserTable).values({
                        username: userName,
                        email: email,
                        password: password
                    }).returning({
                        email: UserTable.email,
                        password: UserTable.password,
                        userName: UserTable.username
                    })

                } else {

                    user = await db.select().from(UserTable).where(eq(UserTable.email, credentials.email as string))
                }

                return user


            },
        })
    ],
})
