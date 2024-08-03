'use client'

import { useState, useEffect } from 'react'

import { db } from '@/firebase'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, collection, onSnapshot } from 'firebase/firestore'

import useSession from '@/hooks/useSession'
import useNumberFormatter from '@/hooks/useNumberFormatter'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

import { PiChatsTeardrop } from 'react-icons/pi'
import { FaCreativeCommonsShare } from 'react-icons/fa'
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io'

export default function Actions ({ likes, shares, author, videoId, onShowComments, moveAction }) {
  const { session } = useSession()
  const userId = session?.user?.uid

  const [likeCount, setLikeCount] = useState(likes)
  const [userHasLiked, setUserHasLiked] = useState(false)
  const [shareCount, setShareCount] = useState(shares)
  const [userHasShare, setUserHasShare] = useState(false)
  const [commentCount, setCommentCount] = useState(0)

  const { showCompleted } = useDynamicIsland()

  const likesCount = useNumberFormatter(likeCount)
  const commentsCount = useNumberFormatter(commentCount)
  const sharesCount = useNumberFormatter(shareCount)

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

  useEffect(() => {
    const videoRef = doc(db, 'videos', videoId)
    const unsubscribe = onSnapshot(videoRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        setLikeCount(data.likes || 0)
        setUserHasLiked(data.likedBy?.includes(userId) ?? false)
        setShareCount(data.shares || 0)
        setUserHasShare(data.sharedBy?.includes(userId) ?? false)
      }
    })
    return () => unsubscribe()
  }, [videoId, userId])

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
    } else {
      await updateDoc(videoRef, {
        likes: likeCount + 1,
        likedBy: arrayUnion(userId)
      })
      await updateProfileLikes(authorId, 1)
    }
  }

  const handleShare = async () => {
    if (!userId) return

    const videoRef = doc(db, 'videos', videoId)
    await navigator.clipboard.writeText(`https://you-short.vercel.app/video/${videoId}`)

    showCompleted('Copied')

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
    <aside className={`
      flex
      p-4
      flex-col
      self-end
      text-[2rem]
      max-sm:absolute
      max-sm:-right-4
      max-sm:bottom-32
      max-sm:text-white
      ${moveAction
        ? 'flex absolute left-[30%] bottom-32 text-white'
        : ''}`}
    >
      <div className='*:flex *:flex-col *:mt-2 *:items-center *:justify-center'>
        <div>
          <button
            onClick={handleLike}
            style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
          >
            {userHasLiked
              ? (
                <span className='
                  w-11
                  h-11
                  flex
                  mt-0.5
                  items-center
                  rounded-full
                text-red-500
                bg-red-500/10
                  justify-center
                  animate-[like_.3s_ease-in_forwards]
                '
                >
                  <IoMdHeart />
                </span>
                )
              : (
                <span className='
                  w-11
                  h-11
                  flex
                  mt-0.5
                  items-center
                  rounded-full
                  justify-center
                  animate-[unlike_.17s_ease-in_reverse_forwards]
                '
                >
                  <IoIosHeartEmpty />
                </span>
                )}
            <span className='text-sm mb-1.5'>{likesCount}</span>
          </button>
        </div>
        <div>
          <button onClick={onShowComments}>
            <PiChatsTeardrop />
            <span className='text-sm mt-1.5' title='comment'>{commentsCount}</span>
          </button>
        </div>
        <div>
          <button onClick={handleShare}>
            <FaCreativeCommonsShare />
            <span className='text-sm mt-0.5' title='share'>{sharesCount}</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
