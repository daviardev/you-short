'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getSession } from 'next-auth/react'

export default function Home () {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const VerifySession = async () => {
      const session = await getSession()

      if (!session) {
        router.push('/signin')
      } else {
        setSession(session)
        setLoading(false)
      }
    }

    VerifySession()
  }, [])

  loading &&
    router.push('/signin')

  return (
    <>
      {session &&
        (
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
        )}
    </>
  )
}
