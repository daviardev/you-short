import { useRef, useEffect, useState } from 'react'

import Actions from './Actions'
import Comments from '../Comments/Comments'
import VideoDescription from './VideoDescription'

import { CiPlay1, CiPause1, CiVolumeHigh, CiVolumeMute } from 'react-icons/ci'

export default function VideoPlayer ({ likes, comments, shares, author, description, songName, src, avatar, videoId, scrollRef }) {
  const isPlay = useRef()
  const videoRef = useRef()

  const [showModalComment, setShowModalComment] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const isActiveVideo = videoRef => {
    if (!videoRef.current) return false
    const videoTop = videoRef.current.getBoundingClientRect().top
    return videoTop > 0 && videoTop <= 150
  }

  const hideComments = () => {
    setShowModalComment(false)
  }

  const showComments = () => {
    setShowModalComment(true)
  }

  useEffect(() => {
    const handleVideo = async () => {
      if (!videoRef.current) return
      const videoTop = videoRef.current.getBoundingClientRect().top

      if (videoTop > 0 && videoTop <= 150) {
        try {
          await videoRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          setIsPlaying(false)
          videoRef.current.pause()
        }
      } else {
        videoRef.current.currentTime = 0
        videoRef.current.pause()
      }
    }

    const handleBlur = () => {
      if (isActiveVideo(videoRef)) {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }

    const handleFocus = () => {
      if (isActiveVideo(videoRef)) {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }

    scrollRef.current && scrollRef.current.addEventListener('scroll', handleVideo)

    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    return () => {
      scrollRef.current && scrollRef.current.removeEventListener('scroll', handleVideo)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [scrollRef])

  const handlePlayPause = () => {
    if (!videoRef.current) return
    if (!isPlaying) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleMuteUnmute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <>
      <div className='flex items-center justify-center mb-[2.6rem] snap-start last:pb-40'>
        <div className='relative flex justify-center'>
          <div className='w-full h-full flex absolute -z-20'>
            <div className='w-full relative justify-center flex'>
              <video
                className='w-[110%] h-screen object-fill opacity-30 max-sm:hidden right-6 max-sm:blur-none blur-2xl absolute'
                src={src}
                onChange={() => {
                  if (!videoRef.current) return
                  videoRef.current.pause()
                  setIsPlaying(false)
                }}
              />
            </div>
          </div>
          <div className='relative h-[80vh] overflow-hidden flex items-center rounded-xl max-w-[calc((9/16)*80vh)] bg-black video'>
            <video
              ref={videoRef}
              src={src}
              loop
              playsInline
              disableRemotePlayback
              onClick={handlePlayPause}
            />
            <div
              style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.734), transparent)' }}
              className='
                absolute
                top-0
                opacity-0
                invisible
                p-4
                w-full
                z-50
                flex
                justify-between
                box-border
                rounded-xl
                transition-all
                duration-[.2s]
                -translate-y-1/2
                controls
                text-[1.3rem]
                text-white
              '
            >
              <button onClick={handlePlayPause}>
                {isPlaying ? <CiPause1 /> : <CiPlay1 />}
              </button>
              <button onClick={handleMuteUnmute}>
                {isMuted ? <CiVolumeMute /> : <CiVolumeHigh />}
              </button>
            </div>
            <button
              ref={isPlay}
              onClick={handlePlayPause}
              className={`
                absolute
                top-1/2
                cursor-pointer
                bg-black/20
                flex
                w-16
                h-16
                left-1/2
                opacity-0
                -translate-x-2/4
                -translate-y-2/4
                scale-0
                rounded-full
                items-center
                justify-center
                transition-all
                duration-[.2s]
                text-2xl
                text-white
                ${isPlaying
                  ? ''
                  : '-translate-x-2/4 -translate-y-2/4 scale-100 opacity-100'
                }`}
            >
              <CiPlay1 />
            </button>

            <VideoDescription
              author={author}
              avatar={avatar}
              songName={songName}
              description={description}
              videoId={videoId}
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
            moveAction={showModalComment}
          />

          {showModalComment && (
            <Comments
              onHide={hideComments}
              videoId={videoId}
            />
          )}
        </div>
      </div>
    </>
  )
}
