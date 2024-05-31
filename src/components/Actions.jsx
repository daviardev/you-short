'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { db } from '@/firebase'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, collection, onSnapshot } from 'firebase/firestore'

import useSession from '@/hooks/useSession'

import { Heart, Comment, Share } from './SvgConverted'

export default function Actions ({ likes, shares, author, avatar, videoId, onShowComments }) {
  const { session } = useSession()
  const userId = session?.user?.uid

  const [likeCount, setLikeCount] = useState(likes)
  const [userHasLiked, setUserHasLiked] = useState(false)
  const [shareCount, setShareCount] = useState(shares)
  const [userHasShare, setUserHasShare] = useState(false)
  const [commentCount, setCommentCount] = useState(0)

  useEffect(() => {
    const checkIfUserInteracted = async () => {
      if (videoId && userId) {
        const videoDoc = await getDoc(doc(db, 'videos', videoId))
        if (videoDoc.exists()) {
          const videoData = videoDoc.data()
          setUserHasLiked(videoData.likedBy?.includes(userId) ?? false)
          setUserHasShare(videoData.sharedBy?.includes(userId) ?? false)
        }
      }
    }
    checkIfUserInteracted()
  }, [videoId, userId])

  useEffect(() => {
    if (!videoId) return

    const commentsRef = collection(db, 'videos', videoId, 'comments')
    const unsubscribe = onSnapshot(commentsRef, snapshot => {
      setCommentCount(snapshot.size)
    })

    return () => unsubscribe()
  }, [videoId])

  const updateProfileLikes = async (authorId, increment) => {
    const userRef = doc(db, 'users', authorId)
    const userDoc = await getDoc(userRef)
    if (userDoc.exists()) {
      const currentLikes = userDoc.data().likes || 0
      await updateDoc(userRef, {
        likes: currentLikes + increment
      })
    }
  }

  const handleLike = async () => {
    if (!userId) return

    const videoRef = doc(db, 'videos', videoId)
    const authorId = author

    if (userHasLiked) {
      await updateDoc(videoRef, {
        likes: likeCount - 1,
        likedBy: arrayRemove(userId)
      })
      await updateProfileLikes(authorId, -1)
      setLikeCount(Math.max(likeCount - 1, 0))
      setUserHasLiked(false)
    } else {
      await updateDoc(videoRef, {
        likes: likeCount + 1,
        likedBy: arrayUnion(userId)
      })
      await updateProfileLikes(authorId, 1)
      setLikeCount(likeCount + 1)
      setUserHasLiked(true)
    }
  }

  const handleShare = async () => {
    if (!userId) return

    const videoRef = doc(db, 'videos', videoId)

    navigator && console.info('Copy')
    await navigator.clipboard.writeText(`http://localhost:3000/video/${videoId}`)

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
    <aside className='flex flex-col items-center absolute bottom-[70px] right-1 z-20'>
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
        <button
          onClick={onShowComments}
          className='text-white flex flex-col justify-center items-center mb-1 bg-transparent border-none'
        >
          <Comment width={30} />
          <span className='text-sm' title='comment'>{commentCount}</span>
        </button>
        <button onClick={handleShare} className='text-white flex flex-col justify-center items-center mb-1 bg-transparent border-none'>
          <Share width={30} />
          <span className='text-sm' title='share'>{shareCount}</span>
        </button>
      </div>
    </aside>
  )
}
