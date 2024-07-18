'use client'

import { createContext, useState, useContext } from 'react'

const DynamicIslandContext = createContext()

export const useDynamicIsland = () => useContext(DynamicIslandContext)

export const DynamicIslandProvider = ({ children }) => {
  const [state, setState] = useState('inactive')
  const [information, setInformation] = useState('')

  const showLoading = () => setState('loading')

  const showCompleted = info => {
    setInformation(info)
    setState('completed')
    setTimeout(() => {
      setState('inactive')
    }, 3000)
  }

  const showError = info => {
    setInformation(info)
    setState('error')
    setTimeout(() => {
      setState('inactive')
    }, 3000)
  }

  return (
    <DynamicIslandContext.Provider value={{
      state,
      information,
      showError,
      showLoading,
      showCompleted
    }}
    >
      {children}
    </DynamicIslandContext.Provider>
  )
}
