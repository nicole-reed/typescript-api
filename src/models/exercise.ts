import { z } from "zod";

export const exerciseSchema = z.object({
    name: z.string(),
    max: z.string(),
    id: z.string(),
    userid: z.string()
});

export const addExerciseRequestSchema = z.object({
    body: z.object({
        name: z.string(),
        max: z.string(),
        userid: z.string()
    })
});

export const getExerciseRequestSchema = z.object({
    params: z.object({
        id: z.string()
    })
});

export type Exercise = z.infer<typeof exerciseSchema>