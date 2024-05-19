'use client'

import Loader from '@/components/Load'

import useSession from '@/hooks/useSession'
import FeedVideos from '@/components/FeedVideos'

export default function Home () {
  const { session } = useSession()

  return (
    <>
      {session
        ? (
          <FeedVideos />
          )
        : <Loader />}
    </>
  )
}
