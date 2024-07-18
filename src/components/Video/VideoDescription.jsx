import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import useSession from '@/hooks/useSession'

import SongTicker from './SongTicker'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default function VideoDescription ({ author, description, songName, avatar, videoId }) {
  const [authorUid, setAuthorUid] = useState('')

  const [showFullDescription, setShowFullDescription] = useState(false)

  const toggleDescription = () => setShowFullDescription(!showFullDescription)

  const truncatedDescription = description.slice(0, 50)

  const { session } = useSession()

  const userId = session?.user?.uid

  useEffect(() => {
    const checkIfUserInteracted = async () => {
      if (userId) {
        const videoDoc = await getDoc(doc(db, 'videos', videoId))
        if (videoDoc.exists()) {
          const videoData = videoDoc.data()
          setAuthorUid(videoData.userId)
        }
      }
    }
    checkIfUserInteracted()
  }, [videoId, userId])

  return (
    <>
      <div className='absolute bottom-0 w-full p-4 box-border transition-all duration-[.2s] rounded-xl footer z-20 text-white'>
        <span style={{
          wordBreak: 'break-word'
        }}
        >
          {showFullDescription ? description : truncatedDescription}
          {description.length > 50 &&
              (
                <button
                  onClick={toggleDescription}
                  className='ml-1 font-bold underline'
                >
                  {showFullDescription ? 'less' : 'more'}
                </button>
              )}
        </span>
        <div className='flex items-center justify-between mt-2 text-white'>
          <div className='flex items-center ml-0.5'>
            <Link href={`/user/${authorUid}`} className='flex'>
              <Image
                src={avatar}
                alt={author}
                width={100}
                height={100}
                className='rounded-full w-9 h-9 object-cover'
              />
              <span className='ml-2'>@{author}</span>
            </Link>
          </div>
        </div>
        <SongTicker
          songName={songName}
        />
      </div>
    </>
  )
}
