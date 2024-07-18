import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.SDK_CLIENT_ID || '',
      clientSecret: process.env.SDK_SECRET_CLIENT || ''
    })
  ],
  callbacks: {
    async session ({ session, token }) {
      session.user.tag = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase()

      session.user.uid = token.sub
      return session
    }
  },
  pages: {
    signIn: '/signin'
  }
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
