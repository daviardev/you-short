import Link from 'next/link'

export default function Button ({ children, href }) {
  return (
    <Link
      href={href}
      className='rounded-full text-white mt-6 p-3.5 py-2.5 text-sm font-semibold bg-red-500 hover:bg-red-500/90 bg-red-500/70'
    >
      {children}
    </Link>
  )
}
