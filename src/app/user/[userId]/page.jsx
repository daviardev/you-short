'use client'

import { useParams } from 'next/navigation'
import Profile from '@/components/ProfilePage'

const UserProfile = () => {
  const { userId } = useParams()

  return <Profile userId={userId} />
}

export default UserProfile
