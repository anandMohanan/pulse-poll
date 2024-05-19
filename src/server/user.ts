"use server"

import { db } from "@/db";
import { UserTable } from "@/db/schema/user_schema";
import { lucia } from "@/lib/lucia";
import { zodIssuesFormatter } from "@/lib/utils";
import { SigninFormType, SignupFormType, signInSchema, signUpSchema } from "@/types/user_types";
import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const SignupUserAction = async ({ formData }: { formData: SignupFormType }) => {
    let redirectPath: string | null = null
    try {
        const { userName, email, password } = signUpSchema.parse(formData);
        console.log(userName, email, password)
        const hashedPassword = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        })
        console.log(hashedPassword)
        const hasUserName = await db.select().from(UserTable).where(eq(UserTable.username, userName));
        if (hasUserName.length > 0) {
            throw new Error("Username already exists");
        }
        const hasEmail = await db.select().from(UserTable).where(eq(UserTable.email, email));
        if (hasEmail.length > 0) {
            throw new Error("Email already exists");
        }
        console.log(hasEmail, hasUserName)
        const userId = await db.insert(UserTable).values({
            username: userName,
            email: email,
            password: hashedPassword
        }).returning({ userId: UserTable.id });
        console.log(userId)
        const session = await lucia.createSession(userId[0].userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        redirectPath = "/polls"
    } catch (e) {
        if (e instanceof z.ZodError) {
            throw new Error(zodIssuesFormatter(e.issues));
        } else {
            console.log(e)
            throw new Error(e.message)
        }
    } finally {
        if (redirectPath) {
            redirect(redirectPath)
        }
    }
};


export const SigninUserAction = async ({ formData }: { formData: SigninFormType }) => {
    let redirectPath: string | null = null
    try {
        console.log(formData)
        const { email, password } = signInSchema.parse(formData);
        console.log(email, password)
        const existingUser = await db.select().from(UserTable).where(eq(UserTable.email, email));
        if (existingUser.length === 0) {
            throw new Error("User not found");
        }
        console.log(existingUser)
        const validPassword = await verify(existingUser[0].password, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        console.log(validPassword)
        if (!validPassword) {
            throw new Error("Wrong password");
        }
        const session = await lucia.createSession(existingUser[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        redirectPath = "/polls"
    } catch (e) {
        if (e instanceof z.ZodError) {
            throw new Error(zodIssuesFormatter(e.issues));
        } else {
            throw new Error(e.message)
        }
    } finally {
        if (redirectPath) {
            redirect(redirectPath)
        }
    }
};
