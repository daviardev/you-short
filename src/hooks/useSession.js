import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { getSession, signOut } from 'next-auth/react'

import { db } from '@/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

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

        const userRef = doc(db, 'users', session.user.uid)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) {
          await setDoc(userRef, {
            uid: session.user.uid,
            name: session.user.name,
            image: session.user.image,
            tag: session.user.tag
          })
        }
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
