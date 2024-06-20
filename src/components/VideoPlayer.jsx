'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import Actions from './Actions'
import Comments from './Comments'
import VideoDescription from './VideoDescription'

import { FaPlay, FaPause } from 'react-icons/fa'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

export default function VideoPlayer ({ likes, comments, shares, author, description, albumCover, songName, src, avatar, videoId }) {
  const { showError } = useDynamicIsland()

  const [showModalComment, setShowModalComment] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const video = useRef(null)
  const seekBarRef = useRef(null)
  const { ref, inView } = useInView({
    threshold: 0.5
  })

  useEffect(() => {
    const { current: videoElement } = video

    if (videoElement && inView) {
      videoElement.play().catch(error => {
        showError('Error playing video', error.message)
      })
    } else if (videoElement) {
      videoElement.pause()
    }
  }, [inView])

  const hideComments = () => {
    setShowModalComment(false)
  }

  const showComments = () => {
    setShowModalComment(true)
  }

  const handlePlay = () => {
    const { current: videoElement } = video

    if (!videoElement || !(videoElement instanceof window.HTMLVideoElement)) {
      showError('This element video is invalid.')
      return
    }

    if (videoElement.paused) {
      videoElement.play().catch(error => {
        showError('Error playing video', error.message)
      })
      setIsPaused(false)
    } else {
      videoElement.pause()
      setIsPaused(true)
    }
  }

  const handleTimeUpdate = () => {
    const { current: videoElement } = video
    if (videoElement) {
      setProgress((videoElement.currentTime / videoElement.duration) * 100)
    }
  }

  const handleSeek = (e) => {
    const { current: videoElement } = video
    const rect = seekBarRef.current.getBoundingClientRect()
    const newProgress = Math.min(Math.max(0, (e.clientX - rect.left) / rect.width), 1) * 100

    if (videoElement) {
      videoElement.currentTime = (newProgress / 100) * videoElement.duration
      setProgress(newProgress)
    }
  }

  return (
    <>
      <div ref={ref} className='relative h-[inherit]'>
        <video
          src={src}
          ref={video}
          loop
          onClick={handlePlay}
          onTimeUpdate={handleTimeUpdate}
          controls={false}
          className='w-full h-full object-cover'
          onPause={() => setIsPaused(true)}
          onPlay={() => setIsPaused(false)}
        />

        <button
          className={`absolute bottom-2.5 left-3 w-3 h-3 text-[rgb(22,24,35)] cursor-pointer' ${isPaused ? 'block' : ''}`}
          onClick={handlePlay}
        >
          {isPaused ? <FaPlay fill='rgba(255,255,255,.9)' /> : <FaPause fill='rgba(255,255,255,.9)' />}
        </button>

        <div
          ref={seekBarRef}
          className='absolute bottom-2.5 w-[85%] h-1.5 rounded-full bg-white/30 cursor-pointer right-1'
          onClick={handleSeek}
        >
          <div
            className='h-full rounded-full bg-white/90'
            style={{ width: `${progress}%` }}
          />
          <div
            className='w-3 h-3 bg-white rounded-full absolute -bottom-1 transform-[translate(-50%,-50%)] cursor-pointer z-10'
            style={{ left: `${progress}%` }}
          />
        </div>

        <Actions
          likes={likes}
          shares={shares}
          author={author}
          avatar={avatar}
          comments={comments}
          videoId={videoId}
          onShowComments={showComments}
        />

        {showModalComment && (
          <Comments
            onHide={hideComments}
            videoId={videoId}
          />
        )}

        <VideoDescription
          albumCover={albumCover}
          author={author}
          description={description}
          songName={songName}
        />
      </div>
    </>
  )
}
