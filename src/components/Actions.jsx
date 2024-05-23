'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'

import { db } from '@/firebase'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore'

import useSession from '@/hooks/useSession'

import { Heart, Comment, Share } from './SvgConverted'

export default function Actions ({ likes, comments, shares, author, avatar, videoId }) {
  const { session } = useSession()

  const userId = session?.user?.uid

  const [likeCount, setLikeCount] = useState(likes)
  const [userHasLiked, setUserHasLiked] = useState(false)

  const [shareCount, setShareCount] = useState(shares)
  const [userHasShare, setUserHasShare] = useState(false)

  useEffect(() => {
    const checkIfUserInteracted = async () => {
      if (videoId && userId) {
        const videoDoc = await getDoc(doc(db, 'videos', videoId))
        if (videoDoc.exists()) {
          const videoData = videoDoc.data()
          if (videoData.likedBy && videoData.likedBy.includes(userId)) {
            setUserHasLiked(true)
          } else {
            setUserHasLiked(false)
          }
          if (videoData.sharedBy && videoData.sharedBy.includes(userId)) {
            setUserHasShare(true)
          } else {
            setUserHasShare(false)
          }
        }
      }
    }
    checkIfUserInteracted()
  }, [videoId, userId])

  const handleLike = async () => {
    if (!userId) return

    const videoRef = doc(db, 'videos', videoId)

    if (userHasLiked) {
      await updateDoc(videoRef, {
        likes: likeCount - 1,
        likedBy: arrayRemove(userId)
      })
      setLikeCount(likeCount - 1)
      setUserHasLiked(false)
    } else {
      await updateDoc(videoRef, {
        likes: likeCount + 1,
        likedBy: arrayUnion(userId)
      })
      setLikeCount(likeCount + 1)
      setUserHasLiked(true)
    }
  }

  const handleShare = async () => {
    if (!userId) return

    const videoRef = doc(db, 'videos', videoId)

    if (!userHasShare) {
      await updateDoc(videoRef, {
        shares: shareCount + 1,
        sharedBy: arrayUnion(userId)
      })
      setShareCount(shareCount + 1)
      setUserHasShare(true)
    }
  }

  return (
    <aside className='flex flex-col items-center absolute bottom-[50px] right-1 z-20'>
      <div className='relative'>
        <Link href={`/user/${author}`} className='block w-full h-full'>
          <Image
            src={avatar}
            alt={author}
            width={100}
            height={100}
            className='w-11 h-11 object-cover border border-white border-solid rounded-full'
          />
        </Link>
        <div
          className='
            h-6
            w-6
            bg-transparent
            bg-[url(/images/plus.svg)]
            bg-contain
            bg-no-repeat
            bg-[center_center]
            absolute
            -bottom-2
            left-0
            right-0
            mx-auto
            my-0'
        />
      </div>
      <div className='mt-5'>
        <button
          className='text-white flex flex-col justify-center items-center bg-transparent border-none'
          onClick={handleLike}
        >
          <Heart
            width={30}
            fill={userHasLiked ? 'rgba(254, 44, 85, 1)' : 'white'}
          />
          <span className='text-sm' title='like'>{likeCount}</span>
        </button>
        <button className='text-white flex flex-col justify-center items-center mb-1 bg-transparent border-none'>
          <Comment width={30} />
          <span className='text-sm' title='comment'>{comments}</span>
        </button>
        <Link href={`/video/${videoId}`}>
          <button onClick={handleShare} className='text-white flex flex-col justify-center items-center mb-1 bg-transparent border-none'>
            <Share width={30} />
            <span className='text-sm' title='share'>{shares}</span>
          </button>
        </Link>
      </div>
    </aside>
  )
}
