import Image from 'next/image'

import { redirect } from 'next/navigation'

import { getServerSession } from 'next-auth'

import { Dots } from '@/components/SvgConverted'

export default async function User () {
  const session = await getServerSession()

  !session &&
  redirect('/signin')

  return (
    <>
      <div className='flex inset-0 flex-col relative flex-1 text-[rgb(22,24,35)] '>
        <div className='leading-6 top-0 p-0 flex justify-center h-9 border-b sticky z-30 border-[rgba(22,24,35,.2)]'>
          <h3 className='flex-shrink-0 text-lg font-bold whitespace-nowrap text-ellipsis'>{session.user?.name}</h3>
          <div className='right-1 flex justify-center items-center w-10 absolute'>
            <Dots />
          </div>
        </div>
        <div className='relative max-w-2xl mx-auto my-3'>
          <div className='flex flex-col justify-center items-center'>
            <Image
              src={session.user?.image}
              alt={session.user?.name}
              width={100}
              height={100}
              className='w-24 h-24 bg-cover bg-center bg-no-repeat rounded-full'
            />
          </div>
          <div className='mt-2'>
            <span className='text-[17px] flex justify-center font-semibold w-full text-center items-center'>
              @{session.user?.name}
            </span>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center my-5'>
          <div className='flex gap-9 text-sm'>
            <div className='flex flex-col items-center'>
              <span className='font-bold'>0</span>
              <span>Following</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='font-bold'>0</span>
              <span>Followers</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='font-bold'>0</span>
              <span>Likes</span>
            </div>
          </div>
          <button className='my-5 px-5 py-2 font-semibold text-sm border border-gray-400'>Edit profile</button>
          <p className='mb-3'>Description about me goes here</p>
        </div>
      </div>
    </>
  )
}
