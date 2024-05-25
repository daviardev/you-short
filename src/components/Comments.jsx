import { IoClose } from 'react-icons/io5'

import CommentContent from './CommentContent'
import InputComment from './InputComment'

export default function Comments () {
  return (
    <>
      <div className='flex z-30'>
        <div className='absolute flex inset-0 bg-[rgba(0,0,0,.5)] shadow-[rgba(0,0,0,.6)] opacity-100 z-20' />
        <div className='absolute left-0 top-28 w-full bg-[rgb(255,255,255)] rounded-[12px_12px_0px_0px] max-h-[73vh] z-40 transition-transform transform-none'>
          <button className='w-[18px] h-[18px] absolute text-black flex justify-center z-50 items-center right-3 top-3.5'>
            <IoClose />
          </button>
          <div className='overflow-auto pt-10 px-0 pb-0'>
            <div className='flex items-center flex-col text-center h-[calc(-40px+73vh)]'>
              <p className='text-[rgb(22,24,25)] font-bold text-[13px] h-10 leading-[47px] flex justify-center text-center absolute top-0 left-0 w-full'>
                1 comments
              </p>
              <div
                style={{
                  overflow: 'hidden scroll'
                }}
                className='w-full flex-1 px-2.5 py-4 h-full max-w-full box-border'
              >
                <CommentContent />
              </div>
              <InputComment />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
