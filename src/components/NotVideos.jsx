import Link from 'next/link'

import { FiVideoOff } from 'react-icons/fi'

export default function NotVideos () {
  return (
    <>
      <div className='flex flex-col mt-20'>
        <div className='flex-[1,1,auto] flex flex-col items-center my-0 mx-auto'>
          <FiVideoOff className='w-24 h-24' />
          <p className='font-bold text-[rgb(22,24,35)] text-md mt-6'>
            No videos have been uploaded
          </p>
          <p className='font-normal text-sm text-[rgba(22,24,35,.75)] mx-1.5'>
            Be the first to upload a video.
          </p>
          <Link
            href='/upload'
            className='
            flex
            px-4
            mt-6
            border
            py-2.5
            rounded
            text-lg
            min-h-12
            relative
            border-solid
            items-center
            min-w-[168px]
            font-semibold
            justify-center
            text-[rgb(22,24,35)]
            hover:text-[rgb(254,44,85)]
            hover:border-[rgb(254,44,85)]
          '
          >
            Upload
          </Link>
        </div>
      </div>
    </>
  )
}
