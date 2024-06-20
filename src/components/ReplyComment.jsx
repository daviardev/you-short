import Image from 'next/image'
import Link from 'next/link'

import useTimeAgo from '@/hooks/useTimeAgo'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'

export default function ReplyComment ({ author, avatar, comment, timeStamp, replies = [] }) {
  const timeago = useTimeAgo(timeStamp)
  const timestampFormated = useDateTimeFormat(timeStamp)

  return (
    <div className='mb-4 ml-8'>
      <div className='flex flex-row items-start mb-2.5 relative overscroll-contain text-center'>
        <Link className='flex-[0_0_32px] mr-3' href={`/user/@${author}`}>
          <span className='block w-full h-full m-0 p-0 relative align-middle leading-8'>
            <Image width={100} height={100} alt={author} className='w-8 h-8 object-cover border border-white border-solid rounded-full' src={avatar} />
          </span>
        </Link>
        <div className='flex-1 flex flex-col items-start pe-10'>
          <Link href={`/user/@${author}`} className='font-bold text-xs leading-[17px]'>
            {author}
          </Link>
          <p style={{ wordBreak: 'break-word' }} className='text-start whitespace-pre-line text-[15px] leading-[18px] pt-1'>
            {comment}
            <time title={timestampFormated} style={{ wordBreak: 'break-word' }} className='text-[rgba(22,24,35,.5)] ms-1 whitespace-pre-line text-[15px] leading-[18px] text-start'>
              {timeago}
            </time>
          </p>
        </div>
      </div>
      {replies.length > 0 && (
        <div>
          {replies.map((reply, index) => (
            <ReplyComment
              key={index}
              author={reply.commenterUser}
              avatar={reply.commenterAvatar}
              comment={reply.text}
              replies={reply.replies}
              timeStamp={reply.timeStamp}
            />
          ))}
        </div>
      )}
    </div>
  )
}
