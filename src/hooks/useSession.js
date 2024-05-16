import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { getSession, signOut } from 'next-auth/react'

const useSession = () => {
  const [session, setSession] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession()

      if (!session) {
        router.push('/signin')
      } else {
        setSession(session)
      }
    }

    fetchData()
  }, [router])

  const logout = async () => {
    await signOut()

    router.push('/signin')
  }

  return { session, logout }
}

export default useSession
