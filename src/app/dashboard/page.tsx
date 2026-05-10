import { Button } from '@/src/app/components/ui/Button';
import Image from 'next/image';
import room1Image from '@/public/images/room1.png';
import room2Image from '@/public/images/room2.png';
import room3Image from '@/public/images/room3.png';
import { StarIcon } from '@/src/app/components/icons/StarIcon';
import { HeartIcon } from '@/src/app/components/icons/HeartIcon';
import { InputField } from '@/src/app/components/inputs/InputField';
import { CheckboxGroup } from '@/app/components/inputs/CheckboxGroup';
import { SelectField } from '@/app/components/inputs/SelectField';
import { ArrowRightIcon } from '@/app/components/icons';
import modernistRetreatImage from '@/public/images/modernistRetreat.png';
import { LocationIcon } from '@/app/components/icons/LocationIcon';
import Link from 'next/link';
import { PlaneDepartureIcon } from '@/app/components/icons/PlaneDepartureIcon';
import { GearIcon } from '@/app/components/icons/GearIcon';
import { CircleQUestionIcon } from '@/app/components/icons/CircleQuestionIcon';

export default function Home() {
  return (
    <main className='bg-gray-eceef0 flex flex-1'>
      <div className='mx-auto flex w-full max-w-[1280px] flex-1'>
        <aside className='flex w-80 flex-col bg-white p-6'>
          <div className='flex flex-col gap-1'>
            <Link
              href='/'
              className='text-black-45464d fill-black-45464d bg-green-86f2e4 flex items-center gap-1 rounded-[12px] px-4 py-3'
            >
              <PlaneDepartureIcon className='h-5 w-5' /> Trips
            </Link>
            <Link
              href='/'
              className='text-black-45464d fill-black-45464d flex items-center gap-1 rounded-[12px] bg-white px-4 py-3'
            >
              <HeartIcon className='h-5 w-5' /> Favorites
            </Link>
            <Link
              href='/'
              className='text-black-45464d fill-black-45464d flex items-center gap-1 rounded-[12px] bg-white px-4 py-3'
            >
              <GearIcon className='h-5 w-5' /> Settings
            </Link>
            <Link
              href='/'
              className='text-black-45464d fill-black-45464d flex items-center gap-1 rounded-[12px] bg-white px-4 py-3'
            >
              <CircleQUestionIcon className='h-5 w-5' /> Support
            </Link>
          </div>
          <div className='border-gray-e6e8eA mt-5 flex flex-col rounded-[16px] border p-4 shadow-[0px_1px_2px_0px_#0000000D]'>
            <span className='text-black-45464d text-xs font-semibold'>
              TRAVEL CREDITS
            </span>
            <div className='mt-1 flex items-center gap-1'>
              <span className='text-green-006a61 text-2xl font-bold'>
                $1,240
              </span>
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
        <section className='flex w-full flex-col p-6'>
          <h1 className='text-black-191c1e text-[32px] font-semibold'>
            Welcome back, Alex
          </h1>
          <p className='text-black-45464d'>
            You have 2 upcoming trips this month. Adventure awaits!
          </p>

          <div className='mt-8 flex items-center justify-between'>
            <h2 className='text-black-191c1e text-2xl font-semibold'>
              Upcoming Trips
            </h2>
            <button className='flex cursor-pointer items-center gap-2'>
              <span className='text-green-006a61 font-semibold'>View all</span>
              <ArrowRightIcon className='fill-green-006a61 h-5 w-5' />
            </button>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-6'>
            <div className='relative flex max-w-[600px] flex-col overflow-hidden rounded-[24px] bg-white'>
              <Image
                src={modernistRetreatImage}
                alt=''
                className='aspect-square object-cover'
              />
              <span className='bg-green-86f2e4 text-green-006f66 absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold'>
                CONFIRMED
              </span>
              <div className='flex justify-between gap-4 p-6'>
                <div className='flex w-full flex-col'>
                  <span className='text-green-006a61 text-sm font-semibold'>
                    JUNE 12 - JUNE 18
                  </span>
                  <h2 className='text-black-191c1e mt-2 text-2xl font-semibold'>
                    Ocean Whisperer Villa
                  </h2>
                  <div className='mt-2 flex items-center gap-1'>
                    <LocationIcon className='fill-black-45464d h-4 w-4' />
                    <span className='text-black-45464d text-sm font-medium'>
                      Santorini, Greece
                    </span>
                  </div>
                  <div className='bg-gray-e6e8eA mt-4 flex rounded-[16px] p-4'>
                    <div className='border-gray-94a3b8 flex w-full flex-col border-r'>
                      <span className='text-black-45464d text-xs font-semibold'>
                        Check-in
                      </span>
                      <span className='text-black-191c1e text-sm font-bold'>
                        14:00 PM
                      </span>
                    </div>
                    <div className='flex w-full flex-col'>
                      <span className='text-black-45464d text-end text-xs font-semibold'>
                        Reservation
                      </span>
                      <span className='text-black-191c1e text-end text-sm font-bold'>
                        #HQ-92831
                      </span>
                    </div>
                  </div>
                  <Button
                    variant='roundedFill'
                    className='mt-6 h-12 !rounded-[16px] bg-black px-6'
                  >
                    <span className='text-white'>Manage Booking</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className='relative flex max-w-[600px] flex-col overflow-hidden rounded-[24px] bg-white'>
              <Image
                src={modernistRetreatImage}
                alt=''
                className='aspect-square object-cover'
              />
              <span className='bg-gray-eceef0 text-black-191c1e absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold'>
                PENDING PAYMENT
              </span>
              <div className='flex justify-between gap-4 p-6'>
                <div className='flex w-full flex-col'>
                  <span className='text-green-006a61 text-sm font-semibold'>
                    JULY 12 - JULY 18
                  </span>
                  <h2 className='text-black-191c1e mt-2 text-2xl font-semibold'>
                    Ocean Whisperer Villa
                  </h2>
                  <div className='mt-2 flex items-center gap-1'>
                    <LocationIcon className='fill-black-45464d h-4 w-4' />
                    <span className='text-black-45464d text-sm font-medium'>
                      Santorini, Greece
                    </span>
                  </div>
                  <div className='bg-gray-e6e8eA mt-4 flex rounded-[16px] p-4'>
                    <div className='border-gray-94a3b8 flex w-full flex-col border-r'>
                      <span className='text-black-45464d text-xs font-semibold'>
                        Check-in
                      </span>
                      <span className='text-black-191c1e text-sm font-bold'>
                        14:00 PM
                      </span>
                    </div>
                    <div className='flex w-full flex-col'>
                      <span className='text-black-45464d text-end text-xs font-semibold'>
                        Reservation
                      </span>
                      <span className='text-black-191c1e text-end text-sm font-bold'>
                        #HQ-92831
                      </span>
                    </div>
                  </div>
                  <Button
                    variant='roundedBorder'
                    className='!border-gray-76777D mt-6 h-12 !rounded-[16px] px-6'
                  >
                    <span className='text-black-191c1e'>Complete Payment</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
