import { FiVideoOff } from 'react-icons/fi'

import Button from './Button'

export default function NotVideos () {
  return (
    <>
      <div className='flex flex-col mt-20 mr-12'>
        <div className='flex-[1,1,auto] flex flex-col items-center my-0 mx-auto'>
          <FiVideoOff
            className='w-24 h-24'
          />
          <p className='font-bold text-md mt-6'>
            No videos have been uploaded
          </p>
          <p className='font-normal text-sm text-gray-500 mx-1.5'>
            Be the first to upload a video.
          </p>
          <Button href='/upload'>Upload video</Button>
        </div>
      </div>
    </>
  )
}
