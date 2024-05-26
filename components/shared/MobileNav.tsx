"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton, SignedIn, UserButton } from '@clerk/nextjs'

import { navLinks } from '@/constants'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderNavItem = (link: typeof navLinks[number]) => {
    const isActive = link.route === pathname;

    const handleClick = () => {
      router.push(link.route);
      setIsSidebarOpen(false);
    };
    
    return (
      <li
        key={link.route}
        className={`${isActive && 'gradient-text'} flex gap-2 text-sm items-center whitespace-nowrap text-dark-700`}
      >
        <a className="sidebar-link" onClick={handleClick}>
          <Image
            src={link.icon}
            alt="Icone"
            width={22}
            height={22}
            className={`${isActive && 'imgActive'}`}
          />
          {link.label}
        </a>
      </li>
    );
  };

  const handleSignOut = () => {
    router.push('/');
  }

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/logo-icon.svg"
          alt="ImageLab"
          width={32}
          height={32}
          className="cursor-pointer"
        />
      </Link>

      <nav className="flex gap-2">
        <UserButton afterSignOutUrl='/' showName={false} />

        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger>
            <Image
              src="/assets/icons/menu.svg"
              alt="Menu Mobile"
              width={36}
              height={36}
            />
          </SheetTrigger>
          <SheetContent className="sheet-content">
            <>
              <Image
                src="/assets/logo-text.svg"
                alt="ImageLab"
                width={125}
                height={23}
              />
            </>

            <SignedIn>
              <ul className="header-nav_elements">
                {navLinks.slice(0, 8).map(renderNavItem)}
              </ul>

              <ul className="header-nav_elements">
                <SignOutButton signOutCallback={handleSignOut}>
                  <button>
                    {navLinks.slice(8).map(renderNavItem)}
                  </button>
                </SignOutButton>
              </ul>
            </SignedIn>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default MobileNav