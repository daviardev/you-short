import { FcGoogle } from 'react-icons/fc'

export default function SignIn () {
  return (
    <>
      <div className='flex flex-[1] w-full mt-6 mb-0 mx-auto py-0 px-8 items-center relative flex-col'>
        <div className='py-8 px-0'>
          <h2 className='text-[#161823] mx-auto my-4 text-xl text-center font-bold'>
            Sign up for TikTok
          </h2>
          <h4 className='text-[#0000008f] mt-3 mb-8 mx-0 text-xs text-center'>
            Create a profile, follow other accounts, make your own videos, and more
          </h4>
          <button className='w-full rounded-lg font-bold border border-solid border-[#1618231f] text-xs py-0 pl-4 flex align-middle items-center justify-center h-11 relative break-all whitespace-nowrap mb-3'>
            <FcGoogle
              size={22}
              className='left-1.5 absolute flex'
            />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  )
}
