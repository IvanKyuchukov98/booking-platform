import Link from 'next/link';
import { GlobeIcon } from '@/app/components/icons/GlobeIcon';
import { ShareIcon } from '@/app/components/icons/ShareIcon';
import { CommentIcon } from '@/app/components/icons/CommentIcon';

export function Footer() {
  return (
    <footer className='border-gray-e2e8f0 flex flex-col border-t'>
      <div className='border-gray-e2e8f0 border-b px-6'>
        <div className='xs:grid-cols-2 mx-auto grid max-w-[1280px] gap-8 py-12 md:grid-cols-4'>
          <div className='flex flex-col gap-4'>
            <Link
              href='/public'
              className='text-white-1a1c1c text-xl leading-[28px] font-semibold tracking-tight'
            >
              BookSpace
            </Link>
            <p className='text-gray-64748b text-sm'>
              Making high-end travel experiences accessible and effortless since
              2024.
            </p>
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-black-0f172a text-xs font-bold uppercase'>
              Explore
            </h2>
            <a href='' className='text-gray-64748b text-sm underline'>
              Destinations
            </a>
            <a href='' className='text-gray-64748b text-sm underline'>
              Categories
            </a>
            <a href='' className='text-gray-64748b text-sm underline'>
              Trending
            </a>
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-black-0f172a text-xs font-bold uppercase'>
              Support
            </h2>
            <a href='' className='text-gray-64748b text-sm underline'>
              Help Center
            </a>
            <a href='' className='text-gray-64748b text-sm underline'>
              Safety
            </a>
            <a href='' className='text-gray-64748b text-sm underline'>
              Sitemap
            </a>
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-black-0f172a text-xs font-bold uppercase'>
              Legal
            </h2>
            <a href='' className='text-gray-64748b text-sm underline'>
              Privacy
            </a>
            <a href='' className='text-gray-64748b text-sm underline'>
              Terms
            </a>
          </div>
        </div>
      </div>
      <div className='px-6'>
        <div className='mx-auto flex w-full max-w-[1280px] flex-wrap justify-between gap-5 py-8'>
          <p className='text-gray-64748b text-sm'>
            © 2024 StaysHQ Inc. All rights reserved.
          </p>
          <div className='flex items-center gap-4'>
            <GlobeIcon className='fill-gray-64748b h-5 w-5 cursor-pointer' />
            <ShareIcon className='fill-gray-64748b h-5 w-5 cursor-pointer' />
            <CommentIcon className='fill-gray-64748b h-5 w-5 cursor-pointer' />
          </div>
        </div>
      </div>
    </footer>
  );
}
