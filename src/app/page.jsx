import { redirect } from 'next/navigation'

import { getServerSession } from 'next-auth'

export default async function Home () {
  const session = await getServerSession()

  !session &&
  redirect('/signin')

  return (
    <>
      Welcome {session?.user?.name} show the content
    </>
  )
}
