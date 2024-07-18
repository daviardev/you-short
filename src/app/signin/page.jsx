import { redirect } from 'next/navigation'

import { getProviders } from 'next-auth/react'
import { getServerSession } from 'next-auth'

import AuthButton from '@/components/Utils/AuthButton'

export default async function SignIn () {
  const session = await getServerSession()
  const providers = await getProviders()

  session && redirect('/')

  !providers && <div>Sign in is not available</div>

  return (
    <>
      <div className='
        flex
        my-5
        pt-12
        w-full
        h-full
        mx-auto
        flex-col
        container
        justify-center
        xl:gap-5
        md:gap-5
        lg:justify-normal
      '
      >
        <form className='flex flex-col w-full h-full pb-6 text-center'>
          <h3 className='mb-3 text-4xl font-extrabold text-[var(--text-color)]'>Sign In</h3>
          <p className='mb-4 text-gray-700'>To share your momments</p>
          <AuthButton />
        </form>
      </div>
    </>
  )
}
