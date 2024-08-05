'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

import Loader from '@/components/Utils/Load'
import NotVideosUser from '@/components/Utils/NotVideosUser'

import { IoMdHeartEmpty } from 'react-icons/io'
import { IoChatbubblesOutline, IoCopyOutline, IoLogOutOutline } from 'react-icons/io5'

import useSession from '@/hooks/useSession'
import useNumberFormatter from '@/hooks/useNumberFormatter'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

import { db } from '@/firebase'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'

export default function Profile ({ userId }) {
  const { showError } = useDynamicIsland()

  const [videos, setVideos] = useState([])
  const [totalLikes, setTotalLikes] = useState(0)
  const [totalComments, setTotalComments] = useState({})
  const [userProfile, setUserProfile] = useState(null)

  const { session, logout } = useSession()

  const total = useNumberFormatter(totalLikes)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const uid = userId || session?.user?.uid
      if (uid) {
        const userRef = doc(db, 'users', uid)
        const userDoc = await getDoc(userRef)
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setUserProfile(userData)
          document.title = `You'Short • @${userData.tag}`
        } else {
          showError('User not found')
        }
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

        const commentsCount = {}
        for (const video of userVideos) {
          const commentRef = collection(db, 'videos', video.id, 'comments')
          const commentSnapshot = await getDocs(commentRef)
          commentsCount[video.id] = commentSnapshot.size
        }
        setTotalComments(commentsCount)
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
    <>
      <section className='w-full max-w-4xl mx-auto px-4 md:px-5'>
        <header className='flex items-center gap-6 md:py-8'>
          <div className='flex-shrink-0'>
            <span className='w-20 h-20 md:w-24 md:h-24'>
              <Image
                src={userProfile.image}
                alt={userProfile.tag}
                width={100}
                height={100}
                className='w-full h-full rounded-full border-2 p-1'
              />
            </span>
          </div>
          <div className='flex-1 grid gap-2'>
            <div className='flex items-center gap-2'>
              <h2 className='text-2xl md:text-3xl font-bold'>{userProfile.name}</h2>
            </div>
            <div className='flex items-center gap-4 font-semibold text-sm text-gray-600 dark:text-gray-300'>
              @{userProfile.tag} {' '} • {' '} {total} likes {' '} • {' '} {videos.length} videos
            </div>
          </div>
          <button
            type='button'
            onClick={session?.user?.uid === userId && logout}
            className='bg-sky-50 flex text-black py-0 px-4 h-9 text-center items-center text-sm rounded-full font-bold hover:bg-gray-300'
          >
            {session?.user?.uid === userId
              ? (
                <>
                  <IoLogOutOutline
                    className='mr-2 -ml-1 h-4'
                  />
                  Log out
                </>
                )
              : 'Report'}
          </button>
        </header>
        {videos.length <= 0 && <NotVideosUser />}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 md:mt-8 mb-24'>
          {videos.map((video, index) => (
            <div key={video.id} className='relative group bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow'>
              <Link href={`/video/${video.id}`}>
                <div className='relative'>
                  <video
                    src={video.src}
                    ref={e => {
                      videoRefs.current[index] = e
                    }}
                    loop
                    muted
                    controls={false}
                    className='w-full h-52 object-cover aspect-square hover:scale-110'
                    onMouseEnter={() => mouseEnter(index)}
                    onMouseLeave={() => mouseLeave(index)}
                  />
                  <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <h3 className='text-lg font-semibold' title={video.description}>{video.description}</h3>
                    <div className='flex items-center text-base gap-4 mt-2 *:flex *:items-center *:gap-1'>
                      <span>
                        <IoMdHeartEmpty /> {video.likes}
                      </span>
                      <span>
                        <IoChatbubblesOutline /> {totalComments[video.id] || 0}
                      </span>
                      <span>
                        <IoCopyOutline />  {video.shares}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
