import React from 'react'
import type { NextPage } from 'next'

import Navbar from '@/components/App/NavBar'
import AppHome from '@/components/App/Home/AppHome'

const App: NextPage = () => {
  return (
    <>
      <Navbar />
      <AppHome />
    </>
  )
}

export default App
