'use client'

import { useParams } from 'next/navigation'

import Profile from '@/components/ProfilePage'

export default function User () {
  const { userId } = useParams()

  return <Profile userId={userId} />
}
