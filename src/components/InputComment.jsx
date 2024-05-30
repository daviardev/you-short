import { useState } from 'react'

export default function CommentInput ({ onAddComment }) {
  const [newComment, setNewComment] = useState('')

  const handleAddComment = () => {
    if (newComment.trim() === '' || newComment.length > 150) return
    onAddComment(newComment)
    setNewComment('')
  }

  return (
    <div className='relative flex h-10 w-full'>
      <button
        type='button'
        className='
          absolute
          right-1
          top-1
          rounded
          active:bg-pink-500
          py-2
          px-4
          text-center
          text-xs
          font-bold
          uppercase
          text-white
          shadow-md
          transition-all
          hover:shadow-xl
          bg-[rgb(254,42,84)]
        '
        onClick={handleAddComment}
      >
        post
      </button>
      <input
        type='text'
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        maxLength={150}
        onKeyDown={e => e.key === 'Enter' && handleAddComment()}
        placeholder='Add comment...'
        className='
          h-full
          w-full
          rounded-md
          border
          px-3
          py-2.5
          pr-20
          text-sm
          font-normal
          outline
          outline-0
          transition-all
          placeholder-shown:border
          focus:border-[rgb(254,42,84)]
          focus:border-2
          focus:outline-0
        '
      />
    </div>
  )
}
