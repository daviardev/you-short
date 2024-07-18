import { DynamicIslandProvider } from '@/context/DynamicIslandProvider'

import Navbar from './Navbar'
import DynamicIsland from './DynamicIsland'

export default function MainLayout ({ children }) {
  return (
    <>
      <DynamicIslandProvider>
        <div className='max-w-[1180px] mx-auto my-0'>
          <div className='h-screen'>
            <DynamicIsland />
            <main className='flex'>
              {children}
            </main>
            <Navbar />
          </div>
        </div>
      </DynamicIslandProvider>
    </>
  )
}
