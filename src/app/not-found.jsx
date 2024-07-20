import Button from '@/components/Utils/Button'

import { TbError404 } from 'react-icons/tb'

export default function NotFound () {
  return (
    <section className='container flex flex-col mx-auto pt-12 my-24 text-center'>
      <span className='text-red-600 flex justify-center'>
        <TbError404 size={100} />
      </span>
      <h2 className='text-3xl font-bold tracking-tight sm:text-5xl'>Page not found</h2>
      <p className='mt-6 text-base leading-7'>Sorry, we couldn’t find the page you’re looking for.</p>
      <div className='flex items-center justify-center gap-x-6'>
        <Button href='/'>Go back home</Button>
      </div>
    </section>
  )
}
