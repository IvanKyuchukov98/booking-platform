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
  return (
    <aside className='flex w-80 flex-col bg-white p-6'>
      <div className='flex flex-col gap-1'>
        {LINKS.map((link) => {
          const isActive = activeKey === link.key;
          return (
            <Link
              key={link.key}
              href={link.href}
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
  );
}
