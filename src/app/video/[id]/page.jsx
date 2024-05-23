'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

import VideoPlayer from '@/components/VideoPlayer'

import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function VideoPage () {
  const [video, setVideo] = useState(null)

  const params = useParams()

  const { id } = params

  useEffect(() => {
    const fetchVideo = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'videos', id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setVideo({ id: docSnap.id, ...docSnap.data() })
          } else {
            setVideo(null)
          }
        } catch (error) {
          console.error('Error fetching video:', error)
        }
      } else {
        console.log('No ID provided in URL')
      }
    }

    fetchVideo()
  }, [id])

  if (!id) {
    return <div>No ID provided in URL.</div>
  }

  if (video === null) {
    return <div>Not found video.</div>
  }

  return (
    <div className='w-full h-full snap-center'>
      <VideoPlayer {...video} id={video.id} />
    </div>
  )
}
