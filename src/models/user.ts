import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    username: z.string()
});

export const addUserSchema = z.object({
    body: z.object({
        name: z.string(),
        username: z.string()
    })
});

export const getUserSchema = z.object({
    params: z.object({
        id: z.string()
    })
});

export type User = z.infer<typeof userSchema>