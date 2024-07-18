import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'

import { db } from '@/firebase'
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'

import useSession from '@/hooks/useSession'
import useTimeAgo from '@/hooks/useTimeAgo'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'
import useNumberFormatter from '@/hooks/useNumberFormatter'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

import { FiFlag } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'
import { HiOutlineHeart, HiMiniHeart } from 'react-icons/hi2'

import InputComment from './InputComment'
import ReplyComment from './ReplyComment'

import { Delete, Flag } from '../Utils/SvgConverted'

export default function CommentCard ({
  author,
  avatar,
  comment,
  videoId,
  likedBy,
  replies = [],
  timeStamp,
  commentId,
  commenterId,
  likesComment,
  onDeleteComment
}) {
  const { showError } = useDynamicIsland()
  const { session } = useSession()

  const id = session?.user?.uid

  const timeago = useTimeAgo(timeStamp)
  const timestampFormated = useDateTimeFormat(timeStamp)

  const [likeCount, setLikeCount] = useState(likesComment)

  const [showMenu, setShowMenu] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [userHasLiked, setUserHasLiked] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)

  const likesCount = useNumberFormatter(likeCount)

  useEffect(() => {
    if (likedBy && id) {
      const likedByCurrentUser = likedBy.includes(id)
      setUserHasLiked(likedByCurrentUser)
    }
  }, [likedBy, id])

  useEffect(() => {
    const commentRef = doc(db, 'videos', videoId, 'comments', commentId)
    const unsubscribe = onSnapshot(commentRef, doc => {
      if (doc.exists()) {
        const data = doc.data()
        setLikeCount(data.likes || 0)
        setUserHasLiked(data.likedBy.includes(id))
      }
    })
    return () => unsubscribe()
  }, [videoId, commentId, id])

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
    if (!id) return

    const commentRef = doc(db, 'videos', videoId, 'comments', commentId)

    if (userHasLiked) {
      await updateDoc(commentRef, {
        likes: likeCount - 1,
        likedBy: arrayRemove(id)
      })
      await updateProfileLikes(commenterId, -1)
    } else {
      await updateDoc(commentRef, {
        likes: likeCount + 1,
        likedBy: arrayUnion(id)
      })
      await updateProfileLikes(commenterId, 1)
    }
  }

  const handleAddReply = async replyText => {
    const { tag, image, uid } = session.user
    const commentRef = doc(db, 'videos', videoId, 'comments', commentId)
    const replyData = {
      text: replyText,
      commenterId: uid,
      commenterUser: tag,
      commenterAvatar: image,
      timeStamp: Date.now(),
      likes: 0,
      likedBy: [],
      replyId: `${commentId}-${Date.now()}`
    }

    try {
      const docSnap = await getDoc(commentRef)
      if (docSnap.exists()) {
        const existingReplies = docSnap.data().replies || []
        await updateDoc(commentRef, {
          replies: [...existingReplies, replyData]
        })
      }
    } catch (error) {
      showError('Error adding reply:', error.message)
    }
  }

  const toggleReplyInput = () => {
    setShowReplyInput(prevState => !prevState)
    !showReplyInput && setShowReplies(false)
  }

  const toggleShowReplies = () => {
    setShowReplies(prevState => !prevState)
    !showReplies && setShowReplyInput(false)
  }

  return (
    <div className='mb-4'>
      <div className='flex items-start mb-2.5 relative overscroll-contain text-center'>
        <Link href={`/user/${commenterId}`} className='flex-[0_0_32px] mr-3'>
          <span className='block w-full h-full relative align-middle'>
            <Image
              src={avatar}
              alt={author}
              width={100}
              height={100}
              className='w-8 h-8 object-cover border border-white rounded-full'
            />
          </span>
        </Link>
        <div className='flex-1 flex flex-col items-start'>
          <div className='flex items-center'>
            <Link href={`/user/${commenterId}`} className='mr-1 text-sm font-bold'>{author}</Link>
            <time title={timestampFormated} className='text-xs leading-[15px] text-gray-400'>{timeago}</time>
          </div>
          <p
            style={{
              wordBreak: 'break-word'
            }}
            className='text-start whitespace-pre-line text-[15px] leading-[18px] pt-1'
          >
            {comment}
          </p>
          <div className='flex items-center mt-1'>
            <button
              onClick={handleLike}
              className='mr-1.5 flex items-center text-xs text-gray-400 focus:outline-none'
            >
              {userHasLiked
                ? (
                  <HiMiniHeart
                    className='w-5 h-5 text-red-500 mr-1'
                  />
                  )
                : (
                  <HiOutlineHeart
                    className='w-5 h-5 mr-1'
                  />
                  )}
              <span className='leading-4'>{likesCount}</span>
            </button>
            <button
              onClick={toggleReplyInput}
              className='mr-1.5 text-xs text-gray-400 focus:outline-none'
            >
              Reply
            </button>

            {replies.length > 0 && (
              <button
                onClick={toggleShowReplies}
                className='text-xs text-gray-400 focus:outline-none'
              >
                {showReplies ? 'Hide Replies' : `View ${replies.length} Replies`}
              </button>
            )}

          </div>
        </div>
        {id === commenterId
          ? (
            <>
              <button
                onClick={() => setShowMenu(!showMenu)}
              >
                <Delete />
              </button>

              {showMenu && (
                <div className='absolute bg-[var(--bg)] rounded-lg py-1.5 w-[100px] shadow-xl border -top-3 right-6 z-40'>
                  <button
                    onClick={() => {
                      setShowMenu(false)
                      onDeleteComment(commentId)
                    }}
                    className='flex items-center justify-start w-full py-1 px-1.5 hover:text-[rgb(254,44,85)] cursor-pointer'
                  >
                    <FaRegTrashAlt
                      size={16}
                    />
                    <span className='pl-2 font-semibold text-sm'>Delete</span>
                  </button>
                </div>
              )}

            </>
            )
          : (
            <>
              <button
                onClick={() => setShowMenu(!showMenu)}
              >
                <Flag />
              </button>

              {showMenu && (
                <div className='absolute bg-[var(--bg)] rounded-lg py-1.5 w-[100px] shadow-xl border -top-3 right-6 z-40'>
                  <button
                    onClick={() => setShowMenu(false)}
                    className='flex items-center justify-start w-full py-1 px-1.5 hover:text-[rgb(254,44,85)] cursor-pointer'
                  >
                    <FiFlag
                      size={16}
                    />
                    <span className='pl-2 font-semibold text-sm'>Report</span>
                  </button>
                </div>
              )}

            </>
            )}
      </div>

      {showReplyInput && (
        <div className='ml-10 mt-2'>
          <InputComment
            isReply
            onAddComment={handleAddReply}
          />
        </div>
      )}

      {showReplies && replies.length > 0 && (
        <div className='ml-3.5 mt-2 border-l-2 border-gray-400'>
          {replies.map((reply) => (
            <ReplyComment
              key={reply.replyId}
              author={reply.commenterUser}
              avatar={reply.commenterAvatar}
              comment={reply.text}
              likedBy={reply.likedBy}
              videoId={videoId}
              timeStamp={reply.timeStamp}
              commentId={reply.replyId}
              commenterId={reply.commenterId}
              likesComment={reply.likes}
              parentCommentId={commentId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
