import Link from 'next/link'
import Image from 'next/image'

import { useEffect } from 'react'

import { db } from '@/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

import useSession from '@/hooks/useSession'
import useTimeAgo from '@/hooks/useTimeAgo'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'

export default function ReplyComment ({ author, avatar, comment, commentId, videoId, commenterId, parentCommentId, timeStamp }) {
  const { session } = useSession()
  const id = session?.user?.uid

  const timeago = useTimeAgo(timeStamp)
  const timestampFormated = useDateTimeFormat(timeStamp)

  useEffect(() => {
    const commentRef = doc(db, 'videos', videoId, 'comments', parentCommentId)
    const unsubscribe = onSnapshot(commentRef, doc => {
      if (doc.exists()) {
        const commentData = doc.data()
        const reply = commentData.replies.find(reply => reply.replyId === commentId)

        return reply
      }
    })
    return () => unsubscribe()
  }, [videoId, parentCommentId, commentId, id])

  return (
    <div className='mb-2.5 p-2 flex w-full'>
      <div className='flex relative'>
        <Link
          href={`/user/${commenterId}`}
          className='flex-none mr-3'
        >
          <Image
            width={24}
            height={24}
            src={avatar}
            alt={author}
            className='rounded-full object-cover'
          />
        </Link>
        <div className='flex-1 flex-col'>
          <div className='flex items-center'>
            <span className='mr-1 text-xs font-bold'>{author}</span>
            <time
              title={timestampFormated}
              className='text-[10px] leading-[15px] text-gray-400'
            >
              {timeago}
            </time>
          </div>
          <p
            style={{
              wordBreak: 'break-word'
            }}
            className='text-start whitespace-pre-line text-[15px] leading-[18px] pt-1'
          >
            {comment}
          </p>
        </div>
      </div>
    </div>
  )
}
