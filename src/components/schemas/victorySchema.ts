import z from "zod"

export const victorySchema = z.object({
    name: z.string()
    .trim()
    .min(1, {
        error: "Name must be at least a character."
    })
    .max(20, {
        error: "Name can be at most 20 characters."
    })
});