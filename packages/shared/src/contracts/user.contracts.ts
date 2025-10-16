import { z } from "zod"

export const CreateUserSchema = z.object({
    name: z.string().min(2).max(20).nonoptional(),
    email: z.email(),
    password: z.string().min(8)
})

export type CreateUser = z.infer<typeof CreateUserSchema>