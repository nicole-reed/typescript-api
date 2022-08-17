import { z } from "zod";

export const jwtPayloadSchema = z.object({
    id: z.string()
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>