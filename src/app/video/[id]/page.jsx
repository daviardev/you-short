'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'

import VideoPlayer from '@/components/Video/VideoPlayer'
import { useDynamicIsland } from '@/context/DynamicIslandProvider'

import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function VideoPage () {
  const { showError } = useDynamicIsland()
  const [video, setVideo] = useState(null)

  const { id } = useParams()

  const scrollRef = useRef()

  useEffect(() => {
    const fetchVideo = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'videos', id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const videoData = docSnap.data()
            setVideo({
              id: docSnap.id,
              ...videoData
            })
          } else {
            setVideo(null)
          }
        } catch (error) {
          showError('Error fetching video:', error)
        }
      } else {
        showError('No ID provided in URL')
      }
    }

    fetchVideo()
  }, [id, showError])

  useEffect(() => {
    if (video) document.title = `You'Short | ${video.description} @${video.author}`
  }, [video])

  if (!id) {
    return <div>No ID provided in URL.</div>
  }

  if (video === null) {
    return showError('Video not found')
  }

  return (
    <>
      <section
        ref={scrollRef}
        className='flex flex-[1_1] flex-col sm:pl-20 pt-10 scroll-pt-10 max-sm:items-center'
      >
        <VideoPlayer
          key={video.id}
          videoId={video.id}
          scrollRef={scrollRef}
          {...video}
        />
      </section>
    </>
  )
}
