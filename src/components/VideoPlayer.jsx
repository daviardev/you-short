'use client'

import { useRef, useEffect, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import Actions from './Actions'
import Comments from './Comments'
import VideoDescription from './VideoDescription'

export default function VideoPlayer ({ likes, comments, shares, author, description, albumCover, songName, src, avatar, videoId }) {
  const [showModalComment, setShowModalComment] = useState(false)

  const video = useRef(null)
  const { ref, inView } = useInView({
    threshold: 0.5
  })

  useEffect(() => {
    const { current: videoElement } = video

    if (videoElement && inView) {
      videoElement.play().catch(error => {
        console.error('Error playing video:', error.message)
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
      console.error('This element video is invalid.')
      return
    }

    if (videoElement.paused) {
      videoElement.play().catch(error => {
        console.error('Error playing video:', error.message)
      })
    } else {
      videoElement.pause()
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
          controls={false}
          className='w-full h-full object-cover'
        />

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
