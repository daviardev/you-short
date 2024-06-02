import Footer from '@/components/Footer'
import Header from '@/components/Header'

import { DynamicIslandProvider } from '@/context/DynamicIslandProvider'

import DynamicIsland from '@/components/DynamicIsland'

import '@/styles/globals.css'

export const metadata = {
  title: 'TikTok - Make Your Day',
  description: 'TikTok Clone Firebase NextJS'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <DynamicIslandProvider>
          <div className='shadow-filter'>
            <main className='flex w-[316px] h-[630px] relative'>
              <section className='w-full rounded-[32px] flex gap-3 flex-col relative px-1.5 py-4 m-6'>
                <div className='absolute bg-white inset-0 -z-10 rounded-[32px]' />
                <DynamicIsland />
                <Header />
                <div className='relative w-full h-full mx-auto my-0'>
                  <article
                    className='absolute inset-0 w-full h-full z-20 overflow-y-scroll overflow-hidden'
                    style={{
                      scrollSnapType: 'y mandatory'
                    }}
                  >
                    {children}
                  </article>
                </div>
                <Footer />
              </section>
            </main>
          </div>
        </DynamicIslandProvider>
      </body>
    </html>
  )
}
