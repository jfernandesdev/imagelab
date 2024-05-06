"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton, SignedIn, UserButton } from '@clerk/nextjs'

import { navLinks } from '@/constants'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const renderNavItem = (link: typeof navLinks[number]) => {
    const isActive = link.route === pathname;

    return (
      <li
        key={link.route}
        className={`${isActive && 'gradient-text'} flex gap-2 text-sm items-center whitespace-nowrap text-dark-700`}
      >
        <Link className="sidebar-link" href={link.route}>
          <Image
            src={link.icon}
            alt={link.label}
            width={22}
            height={22}
            className={`${isActive && 'imgActive'}`}
          />
          {link.label}
        </Link>
      </li>
    );
  };

  const handleSignOut = () => {
    router.push('/sign-in');
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

        <Sheet>
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