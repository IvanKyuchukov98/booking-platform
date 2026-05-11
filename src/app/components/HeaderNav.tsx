'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/components/ui/Button';
import { clerkAppearance } from '@/lib/clerkAppearance';

const ACTIVE_CLASS =
  'text-green-0d9488 border-green-0d9488 border-b-2 pb-1 font-semibold';
const INACTIVE_CLASS = 'text-gray-475569 pb-1';

function isActive(pathname: string, exact: string, prefixes: string[] = []) {
  if (pathname === exact) return true;
  return prefixes.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export function HeaderNav() {
  const { isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();

  if (!isLoaded) {
    return <nav className='flex h-9 items-center gap-3' />;
  }

  const exploreActive = isActive(pathname, '/', ['/rooms']);
  const tripsActive = isActive(pathname, '/dashboard', ['/dashboard']);
  const favoritesActive = isActive(pathname, '/favorites', ['/favorites']);

  return (
    <nav className='ml-8 flex w-full items-center justify-between gap-6'>
      <div className='flex items-center gap-6'>
        <Link href='/' className={exploreActive ? ACTIVE_CLASS : INACTIVE_CLASS}>
          Explore
        </Link>
        <Link
          href='/dashboard'
          className={tripsActive ? ACTIVE_CLASS : INACTIVE_CLASS}
        >
          Trips
        </Link>
        <Link
          href='/favorites'
          className={favoritesActive ? ACTIVE_CLASS : INACTIVE_CLASS}
        >
          Favorites
        </Link>
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
  );
}
