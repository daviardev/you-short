'use client'

import Link from 'next/link'
import Image from 'next/image'

import { Heart, Comment, Share } from './SvgConverted'

export default function Actions ({ likes, comments, shares, author, avatar }) {
  return (
    <>
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
          <button className='text-white flex flex-col justify-center items-center bg-transparent border-none'>
            <Heart
              width={30}
              fill='white'
            />
            <span className='text-sm' title='like'>{likes}</span>
          </button>
          <button className='text-white flex flex-col justify-center items-center mb-1 bg-transparent border-none'>
            <Comment width={30} />
            <span className='text-sm' title='comment'>{comments}</span>
          </button>
          <button className='text-white flex flex-col justify-center items-center mb-1 bg-transparent border-none'>
            <Share width={30} />
            <span className='text-sm' title='share'>{shares}</span>
          </button>
        </div>
      </aside>
    </>
  )
}
