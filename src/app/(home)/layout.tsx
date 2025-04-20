import React from 'react'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  )
}

export default layout
