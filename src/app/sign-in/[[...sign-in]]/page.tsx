import type { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerkAppearance';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to BookSpace to manage your trips and reservations.',
};

export default function SignInPage() {
  return (
    <main className='bg-gray-eceef0 flex flex-1 items-center justify-center px-6 py-16'>
      <div className='flex w-full max-w-[440px] flex-col items-center'>
        <div className='mb-8 text-center'>
          <h1 className='text-black-191c1e text-3xl font-bold'>
            Welcome back to BookSpace
          </h1>
          <p className='text-black-45464d mt-2'>
            Sign in to manage your trips and reservations.
          </p>
        </div>
        <SignIn
          appearance={clerkAppearance}
          signUpUrl='/sign-up'
          fallbackRedirectUrl='/dashboard'
        />
      </div>
    </main>
  );
}
