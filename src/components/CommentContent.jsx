import Image from 'next/image'
import Link from 'next/link'

export default function CommentContent () {
  return (
    <div className='mb-4'>
      <div className='flex flex-row items-start mb-2.5 relative overscroll-contain text-center'>
        <Link className='flex-[0_0_32px] mr-3' href='/user'>
          <span className='block w-full h-full m-0 p-0 relative align-middle leading-8'>
            <Image
              width={100}
              height={100}
              alt='imagen de usuario'
              className='w-8 h-8 object-cover border border-white border-solid rounded-full'
              src='/images/cover.jpg'
            />
          </span>
        </Link>
        <div className='flex-1 flex flex-col items-start pe-10'>
          <Link href='/user' className='font-bold text-xs leading-[17px]'>
            daviardev
          </Link>
          <p
            style={{
              wordBreak: 'break-word'
            }}
            className='text-start whitespace-pre-line text-[15px] leading-[18px] pt-1'
          >
            WTF bro, what are you going
          </p>
        </div>
        <div className='w-12 h-12 flex flex-col justify-center items-center absolute top-0 -right-4'>
          <div className='text-[rgba(22,24,35,.5)] text-xs leading-[17px] w-5 flex flex-col items-center cursor-pointer'>
            <div className='flex justify-center items-center'>
              <span className='w-5 h-5'>
                <svg
                  style={{
                    width: 'inherit',
                    height: 'inherit'
                  }} width='1em' data-e2e='' height='1em' viewBox='0 0 48 48' fill='currentColor' xmlns='http://www.w3.org/2000/svg'
                ><path fill-rule='evenodd' clip-rule='evenodd' d='M24 9.01703C19.0025 3.74266 11.4674 3.736 6.67302 8.56049C1.77566 13.4886 1.77566 21.4735 6.67302 26.4016L22.5814 42.4098C22.9568 42.7876 23.4674 43 24 43C24.5326 43 25.0432 42.7876 25.4186 42.4098L41.327 26.4016C46.2243 21.4735 46.2243 13.4886 41.327 8.56049C36.5326 3.736 28.9975 3.74266 24 9.01703ZM21.4938 12.2118C17.9849 8.07195 12.7825 8.08727 9.51028 11.3801C6.16324 14.7481 6.16324 20.214 9.51028 23.582L24 38.1627L38.4897 23.582C41.8368 20.214 41.8368 14.7481 38.4897 11.3801C35.2175 8.08727 30.0151 8.07195 26.5062 12.2118L26.455 12.2722L25.4186 13.3151C25.0432 13.6929 24.5326 13.9053 24 13.9053C23.4674 13.9053 22.9568 13.6929 22.5814 13.3151L21.545 12.2722L21.4938 12.2118Z' />
                </svg>
              </span>
            </div>
            <span className='text-xs leading-[17px]'>1</span>
          </div>
        </div>
      </div>
    </div>
  )
}
