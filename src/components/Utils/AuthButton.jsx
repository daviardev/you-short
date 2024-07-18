'use client'

import { signIn } from 'next-auth/react'

import { FaGoogle } from 'react-icons/fa'

export default function AuthButton () {
  return (
    <div>
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        type='button'
        className='
          text-white
          bg-red-500
          hover:bg-red-500/90
          bg-red-500/70
          font-medium
          rounded-full
          text-sm
          px-5
          py-2.5
          text-center
          inline-flex
          items-center
          mr-2
          mb-2'
      >
        <FaGoogle
          size={22}
          className='mr-2 -ml-1 w-4 h-4'
        />
        Continue with Google
      </button>
    </div>
  )
}
