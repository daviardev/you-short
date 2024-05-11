import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.SDK_CLIENT_ID || '',
      clientSecret: process.env.SDK_SECRET_CLIENT || ''
    })
  ],
  pages: {
    signIn: '/signin'
  }
}
