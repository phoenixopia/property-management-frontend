import {string, z} from "zod"


export const signInSchema =z.object({
    email:z.string().email(),
    password:z.string().min(4,"Password must be at least 4 characters")
})


export const forgotPasswordSchema =z.object({
    email:z.string().email()
})

export const resetPasswordSchema = z.object({
    password: z.string().min(3, 'Password must be at least 6 characters'),
    repeatPassword: z.string().min(3, 'Password must be at least 6 characters'),
  }).refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords must match',
    path: ['repeatPassword'],
  });
export const roleSchema =z.object({
    name:string()
})

export const roleFormSchema = z.object({
  roleName: z.string().min(1, "Role name is required"),
  permissions: z.array(z.string()).min(1, "At least one permission is required"),
});

export const userFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  middle_name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone_number: z.string()
    .min(13, "Phone number must be 13 characters including +")
    .max(13, "Phone number must be 13 characters including +")
    .refine((val) => val.startsWith('+2519') || val.startsWith('+2517'), {
      message: "Phone number must start with +2519 or +2517"
    }),
  groups: z.array(z.string()).min(1, "At least one group must be selected"),
});