'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { HeartIcon } from '@/app/components/icons/HeartIcon';
import { PlaneDepartureIcon } from '@/app/components/icons/PlaneDepartureIcon';
import { GearIcon } from '@/app/components/icons/GearIcon';
import { CircleQUestionIcon } from '@/app/components/icons/CircleQuestionIcon';

export type SidebarActiveKey = 'trips' | 'favorites' | 'settings' | 'support';

const LINKS = [
  { key: 'trips', href: '/dashboard', Icon: PlaneDepartureIcon, label: 'Trips' },
  {
    key: 'favorites',
    href: '/favorites',
    Icon: HeartIcon,
    label: 'Favorites',
  },
  { key: 'settings', href: '/', Icon: GearIcon, label: 'Settings' },
  { key: 'support', href: '/', Icon: CircleQUestionIcon, label: 'Support' },
] as const;

export function Sidebar({ activeKey }: { activeKey: SidebarActiveKey }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='border-gray-c2c6d6 mx-6 mt-6 flex h-10 items-center gap-2 self-start rounded-full border bg-white px-4 text-sm font-medium text-black sm:hidden'
        aria-label='Open menu'
        aria-expanded={open}
      >
        <svg
          viewBox='0 0 20 20'
          aria-hidden='true'
          className='h-4 w-4 fill-current'
        >
          <path d='M3 5h14v2H3V5Zm0 4h14v2H3V9Zm0 4h14v2H3v-2Z' />
        </svg>
        Menu
      </button>

      {open && (
        <div
          className='fixed inset-0 z-40 bg-black/40 sm:hidden'
          onClick={() => setOpen(false)}
          aria-hidden='true'
        />
      )}

      <aside
        role='dialog'
        aria-modal={open ? 'true' : undefined}
        aria-label='Account menu'
        className={`fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col overflow-y-auto bg-white p-6 transition-transform duration-300 sm:static sm:max-w-none sm:translate-x-0 sm:transition-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between sm:hidden'>
          <span className='text-black font-semibold'>Menu</span>
          <button
            type='button'
            onClick={() => setOpen(false)}
            className='-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-black'
            aria-label='Close menu'
          >
            <svg
              viewBox='0 0 20 20'
              aria-hidden='true'
              className='h-5 w-5 fill-current'
            >
              <path d='M5.3 4 4 5.3 8.7 10 4 14.7 5.3 16l4.7-4.7L14.7 16 16 14.7 11.3 10 16 5.3 14.7 4 10 8.7 5.3 4Z' />
            </svg>
          </button>
        </div>
        <div className='mt-4 flex flex-col gap-1 sm:mt-0'>
          {LINKS.map((link) => {
            const isActive = activeKey === link.key;
            return (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-black-45464d fill-black-45464d flex items-center gap-1 rounded-[12px] px-4 py-3 ${
                  isActive ? 'bg-green-86f2e4' : 'bg-white'
                }`}
              >
                <link.Icon className='h-5 w-5' /> {link.label}
              </Link>
            );
          })}
        </div>
        <div className='border-gray-e6e8eA mt-5 flex flex-col rounded-[16px] border p-4 shadow-[0px_1px_2px_0px_#0000000D]'>
          <span className='text-black-45464d text-xs font-semibold'>
            TRAVEL CREDITS
          </span>
          <div className='mt-1 flex items-center gap-1'>
            <span className='text-green-006a61 text-2xl font-bold'>$1,240</span>
            <span className='text-black-45464d mt-1 text-sm font-medium'>
              HQ Credits
            </span>
          </div>
          <Button
            variant='roundedFill'
            className='bg-green-006a61 mt-3 h-9 !rounded-[8px] px-6'
          >
            <span className='text-sm font-semibold text-white'>Redeem</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
