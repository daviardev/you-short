'use client'

import { useState, useEffect } from 'react'

import { db } from '@/firebase'
import { doc, collection, addDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore'

import useSession from '@/hooks/useSession'

import { IoClose } from 'react-icons/io5'

import CommentCard from './CommentCard'
import InputComment from './InputComment'

export default function Comments ({ onHide, videoId }) {
  const { session } = useSession()

  const [comments, setComments] = useState([])
  const [commentCount, setCommentCount] = useState(0)

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
      likedBy: []
    }

    try {
      await addDoc(commentsRef, commentData)
    } catch (error) {
      console.error('Error adding comment:', error.message)
    }
  }

  const handleDeleteComment = async commentId => {
    if (!videoId || !commentId) return

    try {
      await deleteDoc(doc(db, 'videos', videoId, 'comments', commentId))
      setComments(comments.filter(comment => comment.id !== commentId))
      setCommentCount(commentCount - 1)
    } catch (error) {
      console.error('Error deleting comment:', error.message)
    }
  }

  return (
    <>
      <div className='flex z-30'>
        <div className='absolute flex inset-0 bg-[rgba(0,0,0,.5)] shadow-[rgba(0,0,0,.6)] opacity-100 z-20' />
        <div className='absolute left-0 top-28 w-full bg-[rgb(255,255,255)] rounded-[12px_12px_0px_0px] max-h-[51vh] z-40'>
          <button
            onClick={onHide}
            className='w-[18px] h-[18px] absolute text-black flex justify-center z-50 items-center right-3 top-3.5'
          >
            <IoClose />
          </button>
          <div className='overflow-auto pt-10 px-0 pb-0'>
            <div className='flex items-center flex-col text-center h-[calc(-40px+73vh)]'>
              <p className='text-[rgb(22,24,25)] font-bold text-[13px] h-10 leading-[47px] flex justify-center text-center absolute top-0 left-0 w-full'>
                {commentCount} comments
              </p>
              <div
                style={{ overflow: 'hidden scroll' }}
                className='w-full flex-1 px-2.5 py-4 h-full max-w-full box-border'
              >
                {!commentCount <= 0
                  ? comments.map(comment => (
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
                    />
                  ))
                  : (
                    <p className='font-normal text-sm text-[rgba(22,24,35,.75)] mx-1.5'>
                      Be the first to comment!
                    </p>
                    )}
              </div>
              <div className='flex mb-[55%]'>
                <div className='flex items-end text-start mb-0 py-2 px-0'>
                  <InputComment onAddComment={handleAddComment} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
