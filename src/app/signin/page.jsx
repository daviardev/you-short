import { redirect } from 'next/navigation'

import { getProviders } from 'next-auth/react'
import { getServerSession } from 'next-auth'

import AuthButton from '@/components/AuthButton'

export default async function SignIn () {
  const session = await getServerSession()
  const providers = await getProviders()

  session &&
  redirect('/')

  !providers &&
    <div>Sign in is not available</div>

  return (
    <>
      <div className='flex flex-[1] w-full mt-6 mb-0 mx-auto py-0 px-8 items-center relative flex-col'>
        <div className='py-8 px-0'>
          <h2 className='text-[#161823] mx-auto my-4 text-xl text-center font-bold'>
            Sign up for TikTok
          </h2>
          <h4 className='text-[#0000008f] mt-3 mb-8 mx-0 text-xs text-center'>
            Create a profile, follow other accounts, make your own videos, and more
          </h4>
          <AuthButton providers={providers} />
        </div>
      </div>
    </>
  )
}
