import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import Link from 'next/link';
import { HeaderNav } from './components/HeaderNav';
import { Footer } from './components/Footer';
import './globals.css';

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BookSpace — Curated stays around the world',
    template: '%s · BookSpace',
  },
  description:
    'Discover curated stays — from minimalist urban lofts to secluded coastal retreats. Book in seconds.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en' className={inter.variable}>
        <body className='flex min-h-screen flex-col antialiased'>
          <header className='border-gray-c2c6d6 sticky top-0 z-40 border-b bg-white px-6 md:static'>
            <div className='mx-auto flex h-16 max-w-[1280px] items-center justify-between'>
              <Link
                href='/'
                className='text-white-1a1c1c text-xl leading-[28px] font-semibold tracking-tight'
              >
                BookSpace
              </Link>
              <HeaderNav />
            </div>
          </header>
          <div className='flex flex-1 flex-col'>{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
