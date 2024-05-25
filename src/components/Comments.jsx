'use client'

import { useState } from 'react'

import { IoClose } from 'react-icons/io5'

import CommentCard from './CommentCard'

export default function Comments ({ onHide, comments }) {
  const [input, setInput] = useState('')

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
                {comments} comments
              </p>
              <div
                style={{
                  overflow: 'hidden scroll'
                }}
                className='w-full flex-1 px-2.5 py-4 h-full max-w-full box-border'
              >
                {/* Renderizar la lista de comentarios */}
                <div
                  style={{
                    overflow: 'hidden scroll'
                  }}
                  className='w-full flex-1 px-2.5 py-4 h-full max-w-full box-border'
                >
                  <CommentCard />
                </div>
              </div>
              <div className='flex mb-[55%]'>
                <div className='flex items-end text-start mb-0 py-2 px-0'>
                  <div className='flex-1'>
                    <div className='relative flex flex-row items-end bg-[rgba(22,24,35,.12)] rounded-lg px-[9px]'>
                      <input
                        placeholder='Add comment...'
                        className='flex-1 h-auto mt-2.5 mr-2 mb-2.5 ml-0 bg-transparent placeholder:text-[rgba(22,24,35,.75)] placeholder:text-sm leading-[17px] placeholder:absolute border-none outline-none'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
