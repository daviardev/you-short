'use client'

import Image from 'next/image'

import Loader from '@/components/Load'

import useSession from '@/hooks/useSession'

export default function Home () {
  const { session } = useSession()

  return (
    <>
      {session
        ? (
          <div>
            Welcome {session?.user?.name} show the content
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={100}
              height={100}
              className='rounded-full object-contain'
            />
          </div>
          )
        : <Loader />}
    </>
  )
}
