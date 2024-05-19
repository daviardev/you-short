import { MdMusicNote } from 'react-icons/md'

import Marquee from 'react-fast-marquee'
import SongName from './SongName'

export default function SongTicker ({ songName }) {
  return (
    <div className='flex justify-center items-center'>
      <MdMusicNote />
      <div className='flex-[1] overflow-hidden w-max text-[15px]'>
        <Marquee className='flex translate-x-0'>
          <SongName songName={songName} />
        </Marquee>
      </div>
    </div>
  )
}
