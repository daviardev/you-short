'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect, useRef } from 'react'

import Loader from '@/components/Utils/Load'
import NotVideosUser from '@/components/Utils/NotVideosUser'

import useSession from '@/hooks/useSession'
import useNumberFormatter from '@/hooks/useNumberFormatter'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

import { db } from '@/firebase'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'

export default function Profile ({ userId }) {
  const { showError } = useDynamicIsland()

  const [videos, setVideos] = useState([])

  const [totalLikes, setTotalLikes] = useState(0)

  const [userProfile, setUserProfile] = useState(null)

  const { session, logout } = useSession()

  const total = useNumberFormatter(totalLikes)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const uid = userId || session?.user?.uid

      if (uid) {
        const userRef = doc(db, 'users', uid)
        const userDoc = await getDoc(userRef)

        userDoc.exists()
          ? setUserProfile(userDoc.data())
          : showError('User not found')
      }
    }

    const fetchUserVideos = async () => {
      const uid = userId || session?.user?.uid
      if (uid) {
        const q = query(collection(db, 'videos'), where('userId', '==', uid))
        const querySnapshot = await getDocs(q)
        const userVideos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setVideos(userVideos)

        const totalLikes = userVideos.reduce((acc, video) => acc + (video.likes || 0), 0)
        setTotalLikes(totalLikes)
      }
    }

    fetchUserProfile()
    fetchUserVideos()
  }, [userId, session?.user?.uid])

  const videoRefs = useRef([])

  const mouseEnter = index => videoRefs.current[index] && videoRefs.current[index].play()
  const mouseLeave = index => videoRefs.current[index] && videoRefs.current[index].pause()

  if (!userProfile) return <Loader />

  return (
    <section className='lg:w-8/12 lg:mx-auto mt-8 w-full'>
      <header className='flex flex-wrap items-center p-4 md:py-8'>
        <div className='md:w-3/12 md:ml-16'>
          <Image
            width={100}
            height={100}
            className='
              w-20
              h-20
              md:w-40
              md:h-40
              object-cover
              rounded-full
              border-2
              border-white
              p-1
            '
            src={userProfile.image}
            alt={userProfile.name}
          />
        </div>

        <div className='w-8/12 md:w-7/12 ml-4'>
          <div className='md:flex md:flex-wrap md:items-center mb-4'>
            <h3 className='text-3xl inline-block font-semibold md:mr-2 mb-2 sm:mb-0'>{userProfile.name}</h3>
            {session?.user?.uid === userId && (
              <button
                onClick={logout}
                type='button'
                className='bg-red-500 p-2 text-white font-semibold text-sm rounded block text-center sm:inline-block'
              >
                Log out
              </button>
            )}
          </div>

          <ul className='hidden md:flex space-x-8 mb-4'>
            <li>
              <span className='font-semibold'>{total}</span>
              {' '} likes
            </li>

            <li>
              <span className='font-semibold'>0</span>
              {' '} followers
            </li>
            <li>
              <span className='font-semibold'>0</span>
              {' '} following
            </li>
          </ul>

        </div>
      </header>
      <div className='px-px md:px-3'>
        <ul className='flex md:hidden justify-around space-x-8 border-t text-center p-2 leading-snug text-sm'>
          <li>
            <span className='font-semibold block'>{total}</span>
            {' '} likes
          </li>

          <li>
            <span className='font-semibold block'>0</span>
            {' '} followers
          </li>
          <li>
            <span className='font-semibold block'>0</span>
            {' '} following
          </li>
        </ul>

        <hr />

        {!videos.length && <NotVideosUser />}
        <div className='flex flex-wrap -mx-px md:-mx-3 mt-4'>

          {videos.map((video, index) => (
            <div key={video.id} className='w-1/4 p-px md:px-3'>
              <div className='text-white relative pb-[100%] md:mb-6'>
                <Link href={`/video/${video.id}`}>
                  <video
                    src={video.src}
                    ref={el => {
                      videoRefs.current[index] = el
                    }}
                    loop
                    muted
                    controls={false}
                    className='w-full h-full absolute left-0 top-0 object-cover rounded-lg aspect-video'
                    onMouseEnter={() => mouseEnter(index)}
                    onMouseLeave={() => mouseLeave(index)}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
