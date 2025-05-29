import { SignInView } from '@/modules/auth/ui/views/sign-in-view'
import { caller } from '@/trpc/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  const session = await caller.auth.session()

  if (session.user) {
    redirect('/')
  }

  return <SignInView />
}

export default Page
