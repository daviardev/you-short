'use client'

import { useState, useEffect } from 'react'

import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

import VideoPlayer from './VideoPlayer'

const generateUniqueKey = (video) => `${video.id}-${video.src}`

export default function FeedVideos () {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, 'videos'))
      const videoData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setVideos(videoData)
    }

    fetchVideos()
  }, [])

  return (videos.map(video => (
    <div key={generateUniqueKey(video)} className='w-full h-full snap-center'>
      <VideoPlayer {...video} />
    </div>
  )))
}
