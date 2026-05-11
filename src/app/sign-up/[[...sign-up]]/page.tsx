import type { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerkAppearance';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Create your BookSpace account.',
};

export default function SignUpPage() {
  return (
    <main className='bg-gray-eceef0 flex flex-1 items-center justify-center px-6 py-16'>
      <div className='flex w-full max-w-[440px] flex-col items-center'>
        <div className='mb-8 text-center'>
          <h1 className='text-black-191c1e text-3xl font-bold'>
            Create your BookSpace account
          </h1>
          <p className='text-black-45464d mt-2'>
            Discover curated stays and book in seconds.
          </p>
        </div>
        <SignUp
          appearance={clerkAppearance}
          signInUrl='/sign-in'
          fallbackRedirectUrl='/dashboard'
        />
      </div>
    </main>
  );
}
