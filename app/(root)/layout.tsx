import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Navbar />
    <main className="root">
      <Sidebar />
      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>
    </main>
    </>
  )
}

export default Layout