'use client'

import Image from 'next/image'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

import { LuLoader2 } from 'react-icons/lu'
import { FaCheck, FaExclamation } from 'react-icons/fa'

export default function DynamicIsland () {
  const { state, information } = useDynamicIsland()

  const GetStyle = () => {
    switch (state) {
      case 'loading':
        return {
          width: '250px',
          height: '45px',
          borderRadius: '20px'
        }
      case 'completed':
      case 'error':
        return {
          width: '250px',
          height: '60px',
          borderRadius: '50px'
        }
      default:
        return {
          width: '76px',
          height: '25px',
          borderRadius: '20px'
        }
    }
  }

  return (
    <div
      className='
        top-2.5
        fixed
        left-1/2
        transform
        -translate-x-1/2
        z-50
      bg-black
        transition-[all_640ms_cubic-bezier(.77,0,.18,1)]
        rounded-3xl
    '
      style={GetStyle()}
    >
      {state === 'loading' && (
        <div className='flex justify-between'>
          <div className='flex absolute left-1'>
            <Image
              src='/favicon.svg'
              alt='TikTok Logo'
              className='rounded-full my-1.5 mx-0.5 w-8 h-8'
              width={100}
              height={100}
            />
          </div>
          <div className='flex justify-center right-1 top-1 absolute items-center'>
            <LuLoader2
              className='animate-spin text-white w-8 h-8'
            />
          </div>
        </div>
      )}
      {state === 'completed' && (
        <div className='relative'>
          <div className='flex pl-1 items-center'>
            <div className='flex items-center'>
              <Image
                src='/favicon.svg'
                alt="You'Short Logo"
                className='rounded-full my-3.5 mx-2 w-8 h-8'
                width={100}
                height={100}
              />
              <div className='flex flex-col items-start ml-2'>
                <span className='text-[#6c6c6c] text-sm font-bold'>You'Short</span>
                <span className='text-white text-xs overflow-hidden overflow-ellipsis'>{information}</span>
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
              <Image
                src='/favicon.svg'
                alt="You'Short Logo"
                className='rounded-full my-3.5 mx-2 w-8 h-8'
                width={100}
                height={100}
              />
              <div className='flex flex-col items-start ml-2'>
                <span className='text-[#6c6c6c] text-sm font-bold'>You'Short</span>
                <span className='text-white text-xs overflow-hidden overflow-ellipsis'>{information}</span>
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
