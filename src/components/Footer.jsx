import Link from 'next/link'

import { RiHome5Fill } from 'react-icons/ri'
import { HiOutlineUsers } from 'react-icons/hi2'
import { TbMessage2 } from 'react-icons/tb'
import { FaRegUser } from 'react-icons/fa'

import { Upload } from './SvgConverted'

export default function Footer () {
  return (
    <>
      <footer className='w-full justify-evenly text-sm text-black p-2 gap-5 bottom-0 border-t-[1px] border-[rgba(22,24,35,.2)]'>
        <div className='flex justify-between items-center'>
          <Link
            href='/'
            className='flex flex-col items-center'
          >
            <RiHome5Fill size={22} />
            <span>Home</span>
          </Link>
          <Link
            href='/users'
            className='flex flex-col items-center'
          >
            <HiOutlineUsers size={22} />
            <span>Friends</span>
          </Link>
          <Link
            href='/upload'
            className='flex flex-col items-center'
          >
            <div className='w-[fit-content] flex items-center justify-center my-0 mx-auto top-2/4 left-2/4'>
              <Upload />
            </div>
          </Link>
          <Link
            href='/inbox'
            className='flex flex-col items-center'
          >
            <TbMessage2 size={22} />
            <span>Inbox</span>
          </Link>
          <Link
            href='/profile'
            className='flex flex-col items-center'
          >
            <FaRegUser size={22} />
            <span>Profile</span>
          </Link>
        </div>
      </footer>
    </>
  )
}
