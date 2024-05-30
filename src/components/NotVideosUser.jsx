import { RiUserLine } from 'react-icons/ri'

export default function NotVideosUser () {
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex-[1,1,auto] flex flex-col items-center my-6 mx-auto'>
          <RiUserLine className='w-12 h-12' />
          <p className='font-bold text-[rgb(22,24,35)]'>
            Upload your first video
          </p>
          <p className='font-normal text-sm text-[rgba(22,24,35,.75)] mx-1.5'>
            Your videos will appear here
          </p>
        </div>
      </div>
    </>
  )
}
