import z from 'zod'

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(64, 'Username must be at less than 64 characters')
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      'Username can only contain letter, numbers and hypens. It must start and end with letter or number'
    )
    .refine(val => !val.includes('--'), 'Username cannot contain consecutive hypens')
    .transform(val => val.toLowerCase()),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
