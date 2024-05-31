import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { db } from '@/firebase'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

import useSession from '@/hooks/useSession'
import useTimeAgo from '@/hooks/useTimeAgo'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'

import { FiFlag } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'
import { HiOutlineHeart, HiMiniHeart } from 'react-icons/hi2'

export default function CommentCard ({ author, avatar, comment, likesComment, likedBy, commentId, videoId, commenterId, onDeleteComment, timeStamp }) {
  const { session } = useSession()
  const id = session?.user?.uid

  const timeago = useTimeAgo(timeStamp)
  const timestampFormated = useDateTimeFormat(timeStamp)

  const [likeCount, setLikeCount] = useState(likesComment)

  const [userHasLiked, setUserHasLiked] = useState(false)
  let [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (likedBy && id) {
      const likedByCurrentUser = likedBy.includes(id)
      setUserHasLiked(likedByCurrentUser)
    }
  }, [likedBy, id])

  const handleLike = async () => {
    if (!id) return

    const commentRef = doc(db, 'videos', videoId, 'comments', commentId)

    if (userHasLiked) {
      const newLikeCount = Math.max(0, likeCount - 1)
      await updateDoc(commentRef, {
        likes: newLikeCount,
        likedBy: arrayRemove(id)
      })
      setLikeCount(newLikeCount)
      setUserHasLiked(false)
    } else {
      await updateDoc(commentRef, {
        likes: likeCount + 1,
        likedBy: arrayUnion(id)
      })
      setLikeCount(likeCount + 1)
      setUserHasLiked(true)
    }
  }

  return (
    <div className='mb-4'>
      <div className='flex flex-row items-start mb-2.5 relative overscroll-contain text-center'>
        <Link className='flex-[0_0_32px] mr-3' href={`/user/@${author}`}>
          <span className='block w-full h-full m-0 p-0 relative align-middle leading-8'>
            <Image
              width={100}
              height={100}
              alt={author}
              className='w-8 h-8 object-cover border border-white border-solid rounded-full'
              src={avatar}
            />
          </span>
        </Link>
        <div className='flex-1 flex flex-col items-start pe-10'>
          <Link href={`/user/@${author}`} className='font-bold text-xs leading-[17px]'>
            {author}
          </Link>
          <p
            style={{
              wordBreak: 'break-word'
            }}
            className='text-start whitespace-pre-line text-[15px] leading-[18px] pt-1'
          >
            {comment}
            <time
              title={timestampFormated}
              style={{
                wordBreak: 'break-word'
              }}
              className='text-[rgba(22,24,35,.5)] ms-1 whitespace-pre-line text-[15px] leading-[18px] text-start'
            >
              {timeago}
            </time>
          </p>
        </div>
        <div className='w-12 flex flex-col items-center absolute -right-4 text-[rgba(22,24,35,.5)]'>
          <div className='flex flex-col cursor-pointer'>
            <button onClick={handleLike}>
              <span className='w-5 h-5'>
                {!userHasLiked
                  ? (
                    <HiOutlineHeart size={22} />
                    )
                  : <HiMiniHeart size={22} fill='rgb(254, 44, 85)' />}
              </span>
            </button>
            <span className='text-xs'>{likeCount}</span>
          </div>
          {id === commenterId
            ? (
              <>
                <button
                  onClick={() => setShowMenu(showMenu = !showMenu)}
                >
                  <svg
                    width='1em'
                    height='1em'
                    viewBox='0 0 48 48'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path fillRule='evenodd' clipRule='evenodd' d='M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z' />
                  </svg>
                </button>
                {showMenu && (
                  <div className='absolute bg-white rounded-lg py-1.5 w-[100px] shadow-xl border top-[30px] right-12 z-40'>
                    <button
                      onClick={() => {
                        setShowMenu(false)
                        onDeleteComment(commentId)
                      }}
                      className='flex items-center justify-start w-full py-1 px-1.5 hover:text-[rgb(254,44,85)] cursor-pointer'
                    >
                      <FaRegTrashAlt size={16} />
                      <span className='pl-2 font-semibold text-sm'>Delete</span>
                    </button>
                  </div>
                )}
              </>
              )
            : (
              <>
                <button
                  onClick={() => setShowMenu(showMenu = !showMenu)}
                >
                  <svg
                    width='1em'
                    height='1em'
                    viewBox='0 0 48 48'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path fillRule='evenodd' clipRule='evenodd' d='M4 24C4 21.7909 5.79086 20 8 20C10.2091 20 12 21.7909 12 24C12 26.2091 10.2091 28 8 28C5.79086 28 4 26.2091 4 24ZM20 24C20 21.7909 21.7909 20 24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24ZM36 24C36 21.7909 37.7909 20 40 20C42.2091 20 44 21.7909 44 24C44 26.2091 42.2091 28 40 28C37.7909 28 36 26.2091 36 24Z' />
                  </svg>
                </button>
                {showMenu && (
                  <div className='absolute bg-white rounded-lg py-1.5 w-[100px] shadow-xl border top-[30px] right-12 z-40'>
                    <button
                      onClick={() => {
                        setShowMenu(false)
                      }}
                      className='flex items-center justify-start w-full py-1 px-1.5 hover:text-[rgb(254,44,85)] cursor-pointer'
                    >
                      <FiFlag size={16} />
                      <span className='pl-2 font-semibold text-sm'>Report</span>
                    </button>
                  </div>
                )}
              </>
              )}
        </div>
      </div>
    </div>
  )
}
