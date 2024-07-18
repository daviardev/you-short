'use client'

import useSession from '@/hooks/useSession'

import Loader from '@/components/Utils/Load'
import FeedVideos from '@/components/Video/FeedVideos'

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
