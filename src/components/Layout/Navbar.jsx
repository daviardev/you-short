'use client'

import Link from 'next/link'
import Image from 'next/image'

import useSession from '@/hooks/useSession'

import { BiHomeAlt } from 'react-icons/bi'
import { CiSquarePlus, CiUser } from 'react-icons/ci'

export default function Navbar () {
  const { session } = useSession()

  return (
    <>
      <nav className='fixed flex left-0 right-0 top-auto bottom-5 z-40 flex-col justify-center items-center'>
        <div className='
          mr-4
          flex
          w-[92vw]
          relative
          gap-x-2.5
          rounded-3xl
          items-center
        bg-[#15161c6e]
          justify-center
          backdrop-blur-xl
          p-[10px_10px_10px_16px]
          md:gap-x-6
          xl:w-[32vw]
          md:w-[44vw]
          sm:w-[52vw]
          md:justify-between
        '
        >
          <div className='items-center flex'>
            <Link
              href='/'
            >
              <Image
                src='/favicon.svg'
                alt="You'Short logo"
                width={42}
                height={42}
              />
            </Link>
            <span className='p-2 text-white'>|</span>
          </div>
          <ul className='flex items-center gap-x-5 text-gray-100 font-bold w-full justify-center mr-12'>
            <li>
              <Link
                href='/'
              >
                <BiHomeAlt
                  size={32}
                  title='Go home'
                />
              </Link>
            </li>
            <li>
              <Link
                href='/upload'
              >
                <CiSquarePlus
                  size={35}
                  title='Upload video'
                />
              </Link>
            </li>
            <li className='cursor-pointer'>
              {session
                ? (
                  <Link
                    href={`/user/${session?.user?.uid}`}
                  >
                    <Image
                      className='rounded-full object-cover'
                      height='32'
                      title={session?.user?.name}
                      width='32'
                      alt={session?.user?.bane}
                      src={session?.user?.image}
                    />
                  </Link>
                  )
                : (
                  <CiUser
                    size={25}
                    title='Profile'
                  />
                  )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
