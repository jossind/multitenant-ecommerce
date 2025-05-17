import z from 'zod'
import { TRPCError } from '@trpc/server'
import { headers as getHeaders, cookies as getCokies } from 'next/headers'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { AUTH_COOKIE } from '../constants'
import { loginSchema, registerSchema } from '../schemas'

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders()

    const session = await ctx.payload.auth({ headers })

    return session
  }),

  logout: baseProcedure.mutation(async () => {
    const cookies = await getCokies()
    cookies.delete(AUTH_COOKIE)
  }),
  register: baseProcedure.input(registerSchema).mutation(async ({ input, ctx }) => {
    const existingData = await ctx.payload.find({
      collection: 'users',
      limit: 1,
      where: {
        username: {
          equals: input.username,
        },
      },
    })

    const existingUser = existingData.docs[0]

    console.log('Existing user: ', existingUser)

    if (existingUser) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User already taken',
      })
    }

    await ctx.payload.create({
      collection: 'users',
      data: {
        email: input.email,
        username: input.username,
        password: input.password,
      },
    })

    const data = await ctx.payload.login({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
      },
    })

    if (!data.token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Failed to login',
      })
    }
    const cookies = await getCokies()
    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: '/',
      /* TODOÑ Ensure cross-domain cookie sharing
            
        */
    })
  }),

  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.payload.login({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
      },
    })

    if (!data.token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Failed to login',
      })
    }
    const cookies = await getCokies()
    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: '/',
      /* TODOÑ Ensure cross-domain cookie sharing
            
        */
    })

    return data
  }) /*  */,
})
