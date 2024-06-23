import { useState } from 'react'
import Link from 'next/link'

import AlbumDisk from './AlbumDisk'
import SongTicker from './SongTicker'

export default function VideoDescription ({ author, description, albumCover, songName }) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription)
  }

  const truncatedDescription = description.slice(0, 50)

  return (
    <>
      <div className='
        flex
        items-end
        absolute
        right-0
        bottom-6
        w-full
        text-white
        z-10
        pb-1.5
        px-2.5
        bg-[linear-gradiant(0deg_rgba(0,0,0,.3)_0%_rgba(255,255,255)_60%)]
        text-[13px]
    '
      >
        <div className='min-w-[200px]'>
          <strong>
            <Link
              href={`/user/${author}`}
              className='text-white font-semibold text-base'
            >
              @{author}
            </Link>
          </strong>
          <p>
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
          </p>
          <SongTicker
            songName={songName}
          />
        </div>
        <div className='pr-[.2rem] -my-2'>
          <AlbumDisk
            albumCover={albumCover}
          />
        </div>
      </div>
    </>
  )
}
