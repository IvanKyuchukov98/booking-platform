'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/app/components/buttons/Button';
import { clerkAppearance } from '@/lib/clerkAppearance';

const ACTIVE_CLASS =
  'text-green-0d9488 border-green-0d9488 border-b-2 pb-1 font-semibold';
const INACTIVE_CLASS = 'text-gray-475569 pb-1';

const MOBILE_ACTIVE_CLASS = 'text-green-0d9488 font-semibold';
const MOBILE_INACTIVE_CLASS = 'text-gray-475569';

function isActive(pathname: string, exact: string, prefixes: string[] = []) {
  if (pathname === exact) return true;
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox='0 0 24 24'
      className='fill-gray-475569 h-6 w-6'
      aria-hidden='true'
    >
      {open ? (
        <path d='M6.4 4.99 12 10.59l5.6-5.6L19 6.41 13.41 12 19 17.59 17.6 19 12 13.41 6.4 19 5 17.59 10.59 12 5 6.41z' />
      ) : (
        <path d='M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z' />
      )}
    </svg>
  );
}

export function HeaderNav() {
  const { isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isLoaded) {
    return <nav className='flex h-9 items-center gap-3' />;
  }

  const exploreActive = isActive(pathname, '/', ['/rooms']);
  const tripsActive = isActive(pathname, '/dashboard', ['/dashboard']);
  const favoritesActive = isActive(pathname, '/favorites', ['/favorites']);

  const links = [
    { href: '/', label: 'Explore', active: exploreActive },
    { href: '/dashboard', label: 'Trips', active: tripsActive },
    { href: '/favorites', label: 'Favorites', active: favoritesActive },
  ];

  return (
    <>
      <nav className='ml-8 hidden w-full items-center justify-between gap-6 md:flex'>
        <div className='flex items-center gap-6'>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={l.active ? ACTIVE_CLASS : INACTIVE_CLASS}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-4'>
          {isSignedIn ? (
            <UserButton appearance={clerkAppearance} afterSignOutUrl='/' />
          ) : (
            <>
              <Link href='/sign-in'>
                <Button
                  variant='roundedFill'
                  className='text-gray-475569 bg-white !px-4 !font-medium'
                >
                  Log In
                </Button>
              </Link>
              <Link href='/sign-up'>
                <Button
                  variant='roundedFill'
                  className='bg-green-0d9488 text-white'
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className='flex items-center gap-3 md:hidden'>
        {isSignedIn ? (
          <UserButton appearance={clerkAppearance} afterSignOutUrl='/' />
        ) : null}
        <button
          type='button'
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className='cursor-pointer'
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen ? (
        <div className='border-gray-c2c6d6 fixed top-16 right-0 left-0 z-30 border-b bg-white px-6 py-6 shadow-md md:hidden'>
          <div className='mx-auto flex max-w-[1280px] flex-col gap-4'>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={
                  l.active ? MOBILE_ACTIVE_CLASS : MOBILE_INACTIVE_CLASS
                }
              >
                {l.label}
              </Link>
            ))}
            {!isSignedIn ? (
              <div className='border-gray-c2c6d6 mt-2 flex flex-col gap-3 border-t pt-4'>
                <Link href='/sign-in' onClick={() => setMenuOpen(false)}>
                  <Button
                    variant='roundedFill'
                    className='text-gray-475569 w-full bg-white !font-medium'
                  >
                    Log In
                  </Button>
                </Link>
                <Link href='/sign-up' onClick={() => setMenuOpen(false)}>
                  <Button
                    variant='roundedFill'
                    className='bg-green-0d9488 w-full text-white'
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
