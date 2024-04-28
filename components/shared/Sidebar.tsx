"use client"

import React, { useState } from 'react'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [tooltipVisibility, setTooltipVisibility] = useState<{ [key: string]: boolean }>({});

  const handleFocus = (route: string) => {
    setTooltipVisibility(prevState => ({
      ...prevState,
      [route]: true
    }));
  };

  const handleBlur = (route: string) => {
    setTooltipVisibility(prevState => ({
      ...prevState,
      [route]: false
    }));
  };

  const handleSignOut = () => {
    router.push('/sign-in');
  }

  const renderNavItem = (link: typeof navLinks[number]) => {
    const isActive = link.route === pathname;

    return (
      <li
        key={link.route}
        className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}
        onFocus={() => handleFocus(link.route)}
        onBlur={() => handleBlur(link.route)}
      >
        <Link
          className="sidebar-link"
          href={link.route}
        >
          <Image
            src={link.icon}
            alt={link.label}
            width={24}
            height={24}
            className={`${isActive && 'brightness-200'}`}
          />
        </Link>
        <span className={`tooltip ${!isActive && tooltipVisibility[link.route] ? 'tooltip-show' : 'tooltip-hidden'}`}>
          {link.label}
          <span className="tooltip-pointer"></span>
        </span>
      </li>
    );
  };

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 7).map(renderNavItem)}
            </ul>
            <ul>
              <SignOutButton signOutCallback={handleSignOut}>
                <button>
                  {navLinks.slice(7, 8).map(renderNavItem)}
                </button>
              </SignOutButton>
            </ul>
          </SignedIn>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar