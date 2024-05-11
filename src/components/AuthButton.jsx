'use client'

import { signIn } from 'next-auth/react'

import { FcGoogle } from 'react-icons/fc'

export default function AuthButton ({ providers }) {
  return Object.values(providers).map(provider => (
    <div key={provider.name}>
      <button
        onClick={() => signIn(provider.id)}
        type='button'
        className='
            w-full
            rounded-lg
            font-bold
            border
            border-solid
            border-[#1618231f]
            text-xs
            py-0
            pl-4
            flex
            align-middle
            items-center
            justify-center
            h-11
            relative
            break-all
            whitespace-nowrap
            mb-3
        '
      >
        <FcGoogle
          size={22}
          className='left-1.5 absolute flex'
        />
        Continue with {provider.name}
      </button>
    </div>
  ))
}
