
import { object, string, z } from "zod"

export const createPollSchema = object({
    pollTitle: string({ required_error: "Poll title is required" })
        .min(1, "Poll Title is required"),
    pollDescription: string({ required_error: "Poll Description is required" })
        .min(10, "Poll Description is required")
})

export const PollSchema = () => {
    return true

}

export type CreatePollType = z.infer<typeof createPollSchema>;
