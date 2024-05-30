'use client'

import { useState, useEffect } from 'react'

import { db } from '@/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

import NotVideos from './NotVideos'
import VideoPlayer from './VideoPlayer'

export default function FeedVideos () {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      const q = query(collection(db, 'videos'), orderBy('timeStamp', 'desc'))

      const querySnapshot = await getDocs(q)
      const videoData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setVideos(videoData)
    }

    fetchVideos()
  }, [])

  return (
    <>
      {videos.length
        ? (
            videos.map(video => (
              <div key={video.id} className='w-full h-full snap-center'>
                <VideoPlayer {...video} videoId={video.id} />
              </div>
            ))
          )
        : (
          <NotVideos />
          )}
    </>
  )
}
