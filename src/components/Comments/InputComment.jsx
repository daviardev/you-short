import { useState } from 'react'

import { BiLoaderCircle } from 'react-icons/bi'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

export default function CommentInput ({ onAddComment }) {
  const { showError } = useDynamicIsland()

  const [newComment, setNewComment] = useState('')

  const [uploading, setUploading] = useState(false)

  const handleAddComment = () => {
    try {
      if (newComment.trim() === '' || newComment.length > 150) return
      setUploading(true)
      onAddComment(newComment)
      setNewComment('')
      setUploading(false)
    } catch (err) {
      showError(err)
    }
  }

  return (
    <div className='relative flex h-10 w-full'>
      {!uploading
        ? (
          <>
            <button
              type='button'
              disabled={!newComment}
              className={`
                absolute
                right-1
                top-1
                rounded-full
                active:bg-pink-500
                py-2
                px-4
                text-center
                text-xs
                font-bold
                text-white
                uppercase
                shadow-md
                transition-all
                hover:shadow-xl
                bg-[rgb(254,42,84)]
                ${!newComment && 'bg-pink-500/20 active:bg-pink-500/20'}
              `}
              onClick={handleAddComment}
            >
              post
            </button>

            <input
              type='text'
              value={newComment}
              disabled={uploading}
              onChange={e => setNewComment(e.target.value)}
              maxLength={150}
              placeholder='Post comment...'
              onKeyDown={e => e.key === 'Enter' && handleAddComment()}
              className='
                h-full
                w-full
                px-3
                py-2.5
                pr-20
                text-sm
                bg-transparent
                rounded-sm
                font-normal
                outline
                outline-0
              '
            />
          </>
          )
        : (
          <BiLoaderCircle
            size={20}
            color='#E91E62'
            className='animate-spin'
          />
          )}
    </div>
  )
}
