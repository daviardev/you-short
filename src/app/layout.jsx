import { Montserrat } from 'next/font/google'

import MainLayout from '@/components/Layout/MainLayout'

import '@/styles/globals.css'

const font = Montserrat({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: "You'Short | App for view shorts videos",
  description: "You'Short make in NextJS"
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en' className={font.className}>
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
