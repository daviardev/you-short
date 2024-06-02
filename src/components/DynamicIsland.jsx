'use client'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

import { FaCheck, FaCircle, FaExclamation } from 'react-icons/fa'

export default function DynamicIsland () {
  const { state, information } = useDynamicIsland()

  const GetStyle = () => {
    switch (state) {
      case 'loading':
        return {
          width: '200px',
          height: '25px',
          borderRadius: '20px'
        }
      case 'completed':
      case 'error':
        return {
          width: '270px',
          height: '60px',
          borderRadius: '50px'
        }
      default:
        return {}
    }
  }

  return (
    <div className='top-[12px] w-[76px] right-24 h-6 absolute bg-black transition-[all_640ms_cubic-bezier(.77,0,.18,1)] rounded-3xl' style={GetStyle()}>
      {state === 'loading' && (
        <div className='flex justify-between'>
          <div>
            <img
              src='@/app/favicon.ico'
              alt='TikTok Logo'
              className='rounded-full my-0.5'
              width={20}
              height={90}
            />
          </div>
          <div className='flex justify-center items-center'>
            <FaCircle className='animate-spin' />
          </div>
        </div>
      )}
      {state === 'completed' && (
        <div className='relative'>
          <div className='flex pl-1 items-center'>
            <div className='flex items-center'>
              <img
                src='@/app/favicon.ico'
                alt='TikTok Logo'
                className='rounded-full my-2'
                width={43}
                height={43}
              />
              <div className='flex flex-col items-start ml-2'>
                <span className='text-[#6c6c6c] text-xs font-bold'>TikTok</span>
                <span className='text-white text-xs mt-[3px] -mb-2 overflow-hidden overflow-ellipsis'>{information}</span>
              </div>
              <div className='absolute top-3 right-4 flex items-center'>
                <span className='bg-green-300/20 text-green-300 rounded-full h-9 w-9 flex justify-center items-center'>
                  <FaCheck />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {state === 'error' && (
        <div className='relative'>
          <div className='flex pl-1 items-center'>
            <div className='flex items-center'>
              <img
                src='@/app/favicon.ico'
                alt='TikTok Logo'
                className='rounded-full my-2'
                width={43}
                height={43}
              />
              <div className='flex flex-col items-start ml-2'>
                <span className='text-[#6c6c6c] text-xs font-bold'>TikTok</span>
                <span className='text-white text-xs mt-[3px] -mb-2 overflow-hidden overflow-ellipsis'>{information}</span>
              </div>
              <div className='absolute top-3 right-4 flex items-center'>
                <span className='bg-red-300/20 text-red-300 rounded-full h-9 w-9 flex justify-center items-center'>
                  <FaExclamation />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
