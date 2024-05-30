'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

import Loader from '@/components/Load'
import NotVideosUser from '@/components/NotVideosUser'

import { Dots } from '@/components/SvgConverted'

import { GoSignOut } from 'react-icons/go'

import useSession from '@/hooks/useSession'

import { db } from '@/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default function Profile () {
  const [videos, setVideos] = useState([])

  const [totalLikes, setTotalLikes] = useState(0)

  let [showMenu, setShowMenu] = useState(false)

  const { session, logout } = useSession()

  useEffect(() => {
    const fetchUserVideos = async () => {
      if (session?.user?.uid) {
        const q = query(
          collection(db, 'videos'),
          where('userId', '==', session?.user?.uid)
        )
        const querySnapshot = await getDocs(q)
        const userVideos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setVideos(userVideos)

        const totalLikes = userVideos.reduce((acc, video) => acc + (video.likes || 0), 0)
        setTotalLikes(totalLikes)
      }
    }
    fetchUserVideos()
  }, [session?.user?.uid])

  const videoRefs = useRef([])

  const mouseEnter = index => videoRefs.current[index] && videoRefs.current[index].play()
  const mouseLeave = index => videoRefs.current[index] && videoRefs.current[index].pause()
  return (
    <>
      {session
        ? (
          <div className='flex inset-0 flex-col relative flex-1 text-[rgb(22,24,35)]'>
            <div className='leading-6 top-0 p-0 flex justify-center h-9 border-b sticky z-30 bg-white border-[rgba(22,24,35,.2)]'>
              <h3 className='flex-shrink-0 text-lg font-bold whitespace-nowrap text-ellipsis'>Profile</h3>
            </div>
            <div className='py-2.5 px-4'>
              <div className='relative'>
                <div className='flex items-end'>
                  <div className='relative'>
                    <div className='w-20 h-20'>
                      <Image
                        src={session?.user?.image}
                        alt={session?.user?.name}
                        width={100}
                        height={100}
                        className='rounded-full'
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMenu(showMenu = !showMenu)}
                    className='absolute p-1 mb-1.5 -right-2.5 rounded-full hover:bg-[rgba(22,24,35,.06)] cursor-pointer'
                  >
                    <Dots />
                  </button>
                  <div className='pl-3 flex-1 flex flex-col justify-between'>
                    <h2 className='font-bold text-[20px] leading-[28px]'>{session?.user?.name}</h2>
                    <h1 className='text-[14px] leading-[20px] text-[rgba(22,24,35,.44)]'>{session?.user?.tag}</h1>
                  </div>
                </div>
                {showMenu && (
                  <div className='absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[30px] right-6'>
                    <button
                      onClick={() => {
                        setShowMenu(false)
                        logout()
                      }}
                      className='flex items-center justify-start w-full py-3 px-1.5 hover:bg-gray-100 cursor-pointer'
                    >
                      <GoSignOut size={20} />
                      <span className='pl-2 font-semibold text-sm'>Log out</span>
                    </button>
                  </div>
                )}
                <div className='mt-5'>
                  <div className='flex flex-col justify-center items-center my-5'>
                    <div className='flex gap-6 text-sm'>
                      <div className='flex flex-col items-center'>
                        <span className='font-bold'>0</span>
                        <span>Following</span>
                      </div>
                      <div className='flex flex-col items-center'>
                        <span className='font-bold'>0</span>
                        <span>Followers</span>
                      </div>
                      <div className='flex flex-col items-center'>
                        <span className='font-bold'>{totalLikes}</span>
                        <span>Likes</span>
                      </div>
                    </div>
                  </div>
                  <h4 className='text-base font-medium text-center'>Videos</h4>
                  {videos.length
                    ? videos.map((video, index) => (
                      <div
                        key={video.id}
                        className='grid grid-cols-2 gap-1.5 mt-4 w-auto h-auto'
                      >
                        <div className='opacity-80 hover:opacity-100'>
                          <Link href={`/video/${video.id}`}>
                            <video
                              src={video.src}
                              ref={el => { videoRefs.current[index] = el }}
                              loop
                              muted
                              controls={false}
                              className='w-23 h-auto rounded-md'
                              onMouseEnter={() => mouseEnter(index)}
                              onMouseLeave={() => mouseLeave(index)}
                            />
                          </Link>
                        </div>
                      </div>
                    ))
                    : (
                      <NotVideosUser />
                      )}
                </div>
              </div>
            </div>
          </div>
          )
        : (
          <Loader />
          )}
    </>
  )
}
