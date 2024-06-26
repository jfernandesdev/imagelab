import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/" className="navbar-logo">
        <Image 
          src="/assets/logo-icon.svg" 
          alt="ImageLab"
          width={46}
          height={46}
        />
      </Link>

      <SignedIn>
        <div className="user-avatar-wrapper">
          <UserButton afterSignOutUrl='/' showName/>
        </div>
      </SignedIn>
    </div>
  )
}

export default Navbar