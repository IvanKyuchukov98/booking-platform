'use client';

import { useClerk, useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/src/app/components/ui/Button';

export function HeaderNav() {
  const { isLoaded, isSignedIn } = useUser();
  const { openSignIn, openSignUp } = useClerk();

  if (!isLoaded) {
    return <nav className='flex h-9 items-center gap-3' />;
  }

  if (isSignedIn) {
    return (
      <nav className='ml-8 flex w-full items-center justify-between gap-6'>
        <div className='flex items-center gap-6'>
          <Link
            href='/'
            className='text-green-0d9488 border-green-0d9488 border-b-2 pb-1 font-semibold'
          >
            Explore
          </Link>
          <Link href='/' className='text-gray-475569 pb-1'>
            Trips
          </Link>
          <Link href='/' className='text-gray-475569 pb-1'>
            Favorites
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <Button
            variant='roundedFill'
            className='text-gray-475569 bg-white !px-4 !font-medium'
          >
            Log In
          </Button>
          <Button variant='roundedFill' className='bg-green-0d9488 text-white'>
            Log In
          </Button>
        </div>

        {/*<UserButton />*/}
      </nav>
    );
  }

  return (
    <nav className='flex items-center gap-2'>
      <Button variant='ghost' size='md' onClick={() => openSignIn()}>
        Sign in
      </Button>
      <Button variant='primary' size='md' onClick={() => openSignUp()}>
        Sign up
      </Button>
    </nav>
  );
}
