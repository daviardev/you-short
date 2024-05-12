import { getServerSession } from 'next-auth'

export default async function UploadServer () {
  const session = await getServerSession()

  return session
}
