'use client'

import { useState, useEffect } from 'react'

import { db } from '@/firebase'
import {
  doc,
  query,
  addDoc,
  orderBy,
  deleteDoc,
  collection,
  onSnapshot
} from 'firebase/firestore'

import useSession from '@/hooks/useSession'
import useNumberFormatter from '@/hooks/useNumberFormatter'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

import { IoClose } from 'react-icons/io5'

import CommentCard from './CommentCard'
import InputComment from './InputComment'

export default function Comments ({ onHide, videoId }) {
  const { showError } = useDynamicIsland()
  const { session } = useSession()

  const [comments, setComments] = useState([])
  const [commentCount, setCommentCount] = useState(0)

  const commentsFormat = useNumberFormatter(commentCount)

  useEffect(() => {
    if (!videoId) return

    const commentsRef = collection(db, 'videos', videoId, 'comments')
    const q = query(commentsRef, orderBy('timeStamp', 'desc'))

    const unsubscribe = onSnapshot(q, snapshot => {
      const commentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setComments(commentData)
      setCommentCount(commentData.length)
    })

    return () => unsubscribe()
  }, [videoId])

  const handleAddComment = async (newComment) => {
    const { tag, image, uid } = session.user

    const commentsRef = collection(db, 'videos', videoId, 'comments')
    const commentData = {
      text: newComment,
      commenterId: uid,
      commenterUser: tag,
      commenterAvatar: image,
      timeStamp: Date.now(),
      likes: 0,
      likedBy: [],
      replies: []
    }

    try {
      await addDoc(commentsRef, commentData)
    } catch (error) {
      showError('Error adding comment:', error.message)
    }
  }

  const handleDeleteComment = async commentId => {
    if (!videoId || !commentId) return

    try {
      await deleteDoc(doc(db, 'videos', videoId, 'comments', commentId))
      setComments(comments.filter(comment => comment.id !== commentId))
      setCommentCount(commentCount - 1)
    } catch (error) {
      showError('Error deleting comment:', error.message)
    }
  }

  return (
    <>
      <div className='
        w-[435px]
        p-6
        rounded-r-lg
        max-sm:rounded-xl
        max-sm:border
        max-sm:w-full
        h-full
        z-40
        max-sm:absolute
        max-sm:mr-0
      '
      >
        <button
          onClick={onHide}
          className='w-4 h-4 absolute right-3 top-0 flex justify-center items-center z-50'
        >
          <IoClose />
        </button>
        <div className='overflow-auto px-0 pb-0'>
          <div className='flex flex-col items-center text-center h-[calc(73vh-40px)]'>
            <p className='font-bold text-xs flex justify-center absolute top-0 max-sm:left-0 left-30 w-full'>
              {commentsFormat} comments
            </p>
            <div
              style={{ overflow: 'hidden scroll' }}
              className='w-full flex-1 px-2.5 py-4 h-full max-w-full box-border'
            >
              {commentCount > 0
                ? (
                    comments.map(comment => (
                      <CommentCard
                        key={comment.id}
                        author={comment.commenterUser}
                        avatar={comment.commenterAvatar}
                        comment={comment.text}
                        likesComment={comment.likes}
                        likedBy={comment.likedBy}
                        commentId={comment.id}
                        videoId={videoId}
                        commenterId={comment.commenterId}
                        onDeleteComment={handleDeleteComment}
                        timeStamp={comment.timeStamp}
                        replies={comment.replies}
                      />
                    ))
                  )
                : (
                  <p className='font-normal text-sm mx-1.5'>
                    Be the first to comment!
                  </p>
                  )}
            </div>
            <div className='absolute bottom-2 flex'>
              <div className='flex items-end h-0 mb-0 my-0 px-0'>
                <InputComment
                  onAddComment={handleAddComment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
