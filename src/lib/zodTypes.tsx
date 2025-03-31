import {z} from "zod"


export const signInSchema =z.object({
    email:z.string().email(),
    password:z.string().min(4,"Password must be at least 4 characters")
})


export const forgotPasswordSchema =z.object({
    email:z.string().email()
})

export const resetPasswordSchema =z.object({
    password:z.string().min(4,"Password must be at least 4 characters")
})