import React from 'react'
import { Toaster } from '@/components/ui/toaster'

import MobileNav from '@/components/shared/MobileNav'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import Hero from '@/components/shared/Hero'

import { SignedIn, SignedOut } from '@clerk/nextjs'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <SignedOut>
      <Hero />
    </SignedOut>
    
    <SignedIn>
      <Navbar />
      <main className="root">
        <Sidebar />
        <MobileNav />
        
        <div className="root-container">
          <div className="wrapper">
            {children}
          </div>
        </div>

        <Toaster />
      </main>
    </SignedIn>
    </>
  )
}

export default Layout