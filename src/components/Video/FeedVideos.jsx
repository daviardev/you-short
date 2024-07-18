'use client'

import { useState, useEffect, useRef } from 'react'

import { db } from '@/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

import NotVideos from '../Utils/NotVideos'
import VideoPlayer from './VideoPlayer'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

export default function FeedVideos () {
  const [videos, setVideos] = useState([])

  const scrollRef = useRef()

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
      <section
        ref={scrollRef}
        style={{ scrollSnapType: 'y mandatory' }}
        className='feed-container flex flex-[1_1] flex-col h-screen scroll-smooth overflow-y-scroll sm:pl-44 pt-10 scroll-pt-10 max-sm:items-center'
      >
        {videos.length
          ? (
              videos.map(video => (
                <VideoPlayer
                  key={video.id}
                  videoId={video.id}
                  scrollRef={scrollRef}
                  {...video}
                />
              ))
            )
          : (
            <NotVideos />
            )}
      </section>
      <div className='flex z-50 h-[96vh] flex-col justify-between p-4 box-border mr-8 max-sm:hidden max-lg:mr-4'>
        <button
          onClick={() => { scrollRef.current.scrollTo(0, scrollRef.current.scrollTop - window.innerHeight) }}
          className='button-control'
        >
          <FaArrowUp />
        </button>

        <button
          onClick={() => { scrollRef.current.scrollTo(0, scrollRef.current.scrollTop + window.innerHeight) }}
          className='button-control'
        >
          <FaArrowDown />
        </button>
      </div>
    </>
  )
}
