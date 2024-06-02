import Link from 'next/link'
import Image from 'next/image'

import DynamicIsland from './DynamicIsland'

export default function Header () {
  return (
    <>
      <header className='flex justify-start pl-4'>
        <Link href='/'>
          <Image
            src='/images/tiktok-logo.png'
            alt='TikTok Logo'
            width={20}
            height={20}
            className='w-auto h-auto'
            priority
          />
        </Link>
        <DynamicIsland />
      </header>
    </>
  )
}
