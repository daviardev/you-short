import Link from 'next/link'

import { NotFound } from '@/components/SvgConverted'

export default function NotFoundPage () {
  return (
    <div className='flex flex-col'>
      <div className='flex-[1,1,auto] flex flex-col items-center justify-center text-center my-20 mx-auto'>
        <NotFound />
        <p className='font-bold text-[rgb(22,24,35)] text-2xl mt-6'>
          Page not available
        </p>
        <p className='font-normal text-sm text-[rgba(22,24,35,.75)] mt-2 mx-1.5'>
          Sorry about that! Please try again later.
        </p>
        <Link
          href='/'
          className='
            flex
            px-4
            mt-6
            border
            py-2.5
            rounded
            text-lg
            min-h-12
            relative
            border-solid
            items-center
            min-w-[168px]
            font-semibold
            justify-center
            text-[rgb(22,24,35)]
            hover:bg-gray-50
          '
        >
          Try again
        </Link>
      </div>
    </div>
  )
}
