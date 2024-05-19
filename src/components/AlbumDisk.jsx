import Link from 'next/link'
import Image from 'next/image'

export default function AlbumDisk ({ albumCover }) {
  return (
    <>
      <Link
        href='#'
        className='animate-spin bg-[url(/images/album.svg)] rounded-full w-[45px] h-[45px] flex items-center justify-center'
      >
        <Image
          src={albumCover}
          alt='Album cover'
          width={100}
          height={100}
          className='w-8 h-8 rounded-full object-cover'
        />
      </Link>
    </>
  )
}
