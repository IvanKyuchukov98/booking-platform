import Link from 'next/link';
import { Button } from '@/src/app/components/ui/Button';
import { Card } from '@/src/app/components/ui/Card';
import Image from 'next/image';
import heroImage from '@/public/images/Hero.png';
import uniquqImage from '@/public/images/unique.png';
import beachFrontImage from '@/public/images/beachFront.png';
import cabinsImage from '@/public/images/cabins.png';
import urbanImage from '@/public/images/urban.png';
import santoriniGreeceImage from '@/public/images/santoriniGreece.png';
import tokyoJapanImage from '@/public/images/tokyoJapan.png';
import modernistRetreatImage from '@/public/images/modernistRetreat.png';
import theGlassFrameImage from '@/public/images/theGlassFrame.png';
import romanSkylineImage from '@/public/images/romanSkyline.png';
import { MagnifierIcon, ArrowRightIcon } from '@/src/app/components/icons';
import { StarIcon } from '@/src/app/components/icons/StarIcon';
import { HeartIcon } from '@/src/app/components/icons/HeartIcon';
import { InputField } from '@/src/app/components/inputs/InputField';

const features = [
  {
    title: 'Easy booking',
    body: 'Find an open slot and confirm in under 30 seconds. No accounts to create, no friction.',
  },
  {
    title: 'No phone tag',
    body: 'Real-time availability means no double-booking, no missed calls, no rescheduling chains.',
  },
  {
    title: 'Manage online',
    body: 'Reschedule or cancel from any device. Your dashboard keeps everything organized.',
  },
];

export default function Home() {
  return (
    <main className='mx-auto mb-12'>
      <section className='mx-auto'>
        <div className='relative aspect-[1280/570] h-full w-full'>
          <Image
            src={heroImage}
            alt=''
            fill
            className='object-cover blur-[2px]'
          />
          <div className='absolute h-full w-full bg-black opacity-30'></div>
          <div className='absolute top-1/2 left-1/2 flex w-full -translate-1/2 flex-col gap-4 px-10'>
            <h1 className='text-center text-[32px] leading-[40px] font-bold text-white'>
              Find your sanctuary, anywhere.
            </h1>
            <p className='text-center text-2xl leading-[32px] font-medium text-white'>
              Discover curated stays from minimalist urban lofts to secluded
              coastal retreats.
            </p>
            <div className='mx-auto flex w-full max-w-[400px] items-center rounded-full bg-white p-2'>
              <input
                placeholder='Search for rooms'
                className='text-gray-94a3b8 w-full pl-3 text-xl outline-none'
              ></input>
              <button className='bg-green-0d9488 flex cursor-pointer items-center justify-center rounded-full p-2'>
                <MagnifierIcon className='h-5 w-5 fill-white' />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className='mt-20 px-6'>
        <div className='mx-auto flex max-w-[1280px] flex-col gap-2'>
          <span className='text-black-191c1e'>Unique Categories</span>
          <div className='flex items-center justify-between gap-5'>
            <span className='text-black-45464d'>
              Stays designed for unforgettable experiences.
            </span>
            <button className='flex cursor-pointer items-center gap-2'>
              <span className='text-green-006a61 font-semibold'>
                View all categories
              </span>
              <ArrowRightIcon className='fill-green-006a61 h-5 w-5' />
            </button>
          </div>

          <div className='mt-8 grid grid-cols-4 gap-6'>
            <div className='relative aspect-[290/362] w-full overflow-hidden rounded-[24px]'>
              <Image
                src={beachFrontImage}
                alt=''
                fill
                className='object-cover'
              />
              <div className='bg-overlay-bottom absolute h-full w-full'></div>
              <span className='absolute bottom-6 left-6 text-[16px] text-white'>
                Beachfront
              </span>
            </div>
            <div className='relative aspect-[290/362] w-full overflow-hidden rounded-[24px]'>
              <Image src={cabinsImage} alt='' fill className='object-cover' />
              <div className='bg-overlay-bottom absolute h-full w-full'></div>
              <span className='absolute bottom-6 left-6 text-[16px] text-white'>
                Cabins
              </span>
            </div>
            <div className='relative aspect-[290/362] w-full overflow-hidden rounded-[24px]'>
              <Image src={urbanImage} alt='' fill className='object-cover' />
              <div className='bg-overlay-bottom absolute h-full w-full'></div>
              <span className='absolute bottom-6 left-6 text-[16px] text-white'>
                Urban
              </span>
            </div>
            <div className='relative aspect-[290/362] w-full overflow-hidden rounded-[24px]'>
              <Image src={uniquqImage} alt='' fill className='object-cover' />
              <div className='bg-overlay-bottom absolute h-full w-full'></div>
              <span className='absolute bottom-6 left-6 text-[16px] text-white'>
                Unique
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-gray-eceef0 px-6'>
        <div className='mx-auto mt-20 flex max-w-[1280px] flex-col gap-2 py-20'>
          <span className='text-black-191c1e'>Top Destinations</span>
          <span className='text-black-45464d'>
            Handpicked locations for your next escape.
          </span>
          <div className='mt-8 grid grid-cols-3 gap-6'>
            <div className='flex flex-col overflow-hidden rounded-[24px] bg-white'>
              <Image
                src={beachFrontImage}
                alt=''
                className='max-h-60 object-cover'
              />
              <div className='flex h-full flex-col p-8'>
                <h2 className='text-black-191c1e mb-2'>London, UK</h2>
                <p className='text-black-45464d mb-4'>
                  Experience the perfect blend of historical charm and modern
                  sophistication.
                </p>
                <div className='mt-auto flex items-center justify-between'>
                  <span className='text-green-006a61 font-bold'>
                    $240
                    <span className='text-black-45464d text-sm font-medium'>
                      /night
                    </span>
                  </span>
                  <Button variant='roundedBorder' className='text-black-191c1e'>
                    Explore
                  </Button>
                </div>
              </div>
            </div>

            <div className='flex flex-col overflow-hidden rounded-[24px] bg-white'>
              <Image
                src={santoriniGreeceImage}
                alt=''
                className='max-h-60 object-cover'
              />
              <div className='flex h-full flex-col p-8'>
                <h2 className='text-black-191c1e mb-2'>Santorini, Greece</h2>
                <p className='text-black-45464d mb-4'>
                  Iconic white-washed architecture and breathtaking sunset views
                  over the caldera.
                </p>
                <div className='mt-auto flex items-center justify-between'>
                  <span className='text-green-006a61 font-bold'>
                    $450
                    <span className='text-black-45464d text-sm font-medium'>
                      /night
                    </span>
                  </span>
                  <Button variant='roundedBorder' className='text-black-191c1e'>
                    Explore
                  </Button>
                </div>
              </div>
            </div>

            <div className='flex flex-col overflow-hidden rounded-[24px] bg-white'>
              <Image
                src={tokyoJapanImage}
                alt=''
                className='max-h-60 object-cover'
              />
              <div className='flex h-full flex-col p-8'>
                <h2 className='text-black-191c1e mb-2'>Tokyo, Japan</h2>
                <p className='text-black-45464d mb-4'>
                  A futuristic metropolis offering world-class dining and
                  vibrant nightlife.
                </p>
                <div className='mt-auto flex items-center justify-between'>
                  <span className='text-green-006a61 font-bold'>
                    $180
                    <span className='text-black-45464d text-sm font-medium'>
                      /night
                    </span>
                  </span>
                  <Button variant='roundedBorder' className='text-black-191c1e'>
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='px-6'>
        <div className='mx-auto flex max-w-[1280px] flex-col gap-2 py-20'>
          <span className='text-black-191c1e'>Trending Now</span>
          <span className='text-black-45464d'>
            Our most-loved stays this season.
          </span>
          <div className='mt-8 grid grid-cols-4 gap-6'>
            <div className='relative flex flex-col'>
              <Image
                src={modernistRetreatImage}
                alt=''
                className='aspect-square rounded-[24px] object-cover'
              />
              <button className='bg-gray-cfcfcf absolute top-4 right-4 cursor-pointer rounded-full p-1'>
                <HeartIcon className='fill-black-0f172a h-6 w-6' />
              </button>
              <div className='mt-4 flex h-full justify-between gap-4'>
                <div className='flex flex-col'>
                  <h2 className='text-black-191c1e font-bold'>
                    Modernist Desert Retreat
                  </h2>
                  <span className='text-black-45464d text-sm'>
                    Joshua Tree, California
                  </span>
                  <span className='text-black-191c1e mb-2 text-sm font-medium'>
                    Oct 22 – 27
                  </span>
                  <span className='text-black-191c1e mt-auto font-bold'>
                    $382 <span className='font-normal'>night</span>
                  </span>
                </div>
                <div className='mb-auto flex items-center gap-1'>
                  <StarIcon className='fill-black-191c1e h-4 w-4' />
                  <span className='text-black-191c1e text-sm font-semibold'>
                    4.92
                  </span>
                </div>
              </div>
            </div>

            <div className='relative flex flex-col'>
              <Image
                src={theGlassFrameImage}
                alt=''
                className='aspect-square rounded-[24px] object-cover'
              />
              <button className='bg-gray-cfcfcf absolute top-4 right-4 cursor-pointer rounded-full p-1'>
                <HeartIcon className='fill-black-0f172a h-6 w-6' />
              </button>
              <div className='mt-4 flex h-full justify-between gap-4'>
                <div className='flex flex-col'>
                  <h2 className='text-black-191c1e font-bold'>
                    The Glass A-Frame
                  </h2>
                  <span className='text-black-45464d text-sm'>
                    Tofino, British Columbia
                  </span>
                  <span className='text-black-191c1e mb-2 text-sm font-medium'>
                    Nov 05 – 10
                  </span>
                  <span className='text-black-191c1e mt-auto font-bold'>
                    $215 <span className='font-normal'>night</span>
                  </span>
                </div>
                <div className='mb-auto flex items-center gap-1'>
                  <StarIcon className='fill-black-191c1e h-4 w-4' />
                  <span className='text-black-191c1e text-sm font-semibold'>
                    4.98
                  </span>
                </div>
              </div>
            </div>

            <div className='relative flex flex-col'>
              <Image
                src={romanSkylineImage}
                alt=''
                className='aspect-square rounded-[24px] object-cover'
              />
              <button className='bg-gray-cfcfcf absolute top-4 right-4 cursor-pointer rounded-full p-1'>
                <HeartIcon className='fill-black-0f172a h-6 w-6' />
              </button>
              <div className='mt-4 flex h-full justify-between gap-4'>
                <div className='flex flex-col'>
                  <h2 className='text-black-191c1e font-bold'>
                    Roman Skyline Suite
                  </h2>
                  <span className='text-black-45464d text-sm'>Rome, Italy</span>
                  <span className='text-black-191c1e mb-2 text-sm font-medium'>
                    Dec 12 – 17
                  </span>
                  <span className='text-black-191c1e mt-auto font-bold'>
                    $510 <span className='font-normal'>night</span>
                  </span>
                </div>
                <div className='mb-auto flex items-center gap-1'>
                  <StarIcon className='fill-black-191c1e h-4 w-4' />
                  <span className='text-black-191c1e text-sm font-semibold'>
                    4.85
                  </span>
                </div>
              </div>
            </div>

            <div className='relative flex flex-col'>
              <Image
                src={uniquqImage}
                alt=''
                className='aspect-square rounded-[24px] object-cover'
              />
              <button className='bg-gray-cfcfcf absolute top-4 right-4 cursor-pointer rounded-full p-1'>
                <HeartIcon className='fill-black-0f172a h-6 w-6' />
              </button>
              <div className='mt-4 flex h-full justify-between gap-4'>
                <div className='flex flex-col'>
                  <h2 className='text-black-191c1e font-bold'>
                    Amazon Jungle Lodge
                  </h2>
                  <span className='text-black-45464d text-sm'>
                    Iquitos, Peru
                  </span>
                  <span className='text-black-191c1e mb-2 text-sm font-medium'>
                    Jan 10 – 15
                  </span>
                  <span className='text-black-191c1e mt-auto font-bold'>
                    $125 <span className='font-normal'>night</span>
                  </span>
                </div>
                <div className='mb-auto flex items-center gap-1'>
                  <StarIcon className='fill-black-191c1e h-4 w-4' />
                  <span className='text-black-191c1e text-sm font-semibold'>
                    4.76
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='px-6'>
        <div className='bg-black-131b2e mx-auto flex max-w-[1280px] flex-col items-center gap-6 rounded-[24px] py-20 text-center'>
          <h3 className='text-white'>Join the global community.</h3>
          <p className='text-gray-bec6e0 mx-auto max-w-[640px] px-5'>
            Get curated travel guides, exclusive early-access stays, and
            professional hosting tips directly in your inbox.
          </p>
          <div className='flex w-full items-center justify-center gap-4 px-5'>
            <InputField
              variant='dark'
              className='!h-15 w-full'
              containerClassName='w-full max-w-[300px]'
              placeholder='Your email address'
            ></InputField>
            <Button variant='roundedFill' className='bg-green-86f2e4 h-15 px-8'>
              <span className='text-green-006f66 font-bold'>Join Now</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
