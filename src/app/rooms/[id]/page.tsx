import { Button } from '@/src/app/components/ui/Button';
import Image from 'next/image';
import heroImage from '@/public/images/Hero.png';
import uniquqImage from '@/public/images/unique.png';
import beachFrontImage from '@/public/images/beachFront.png';
import cabinsImage from '@/public/images/cabins.png';
import urbanImage from '@/public/images/urban.png';
import avatarImage from '@/public/images/avatar.jpg';
import santoriniGreeceImage from '@/public/images/santoriniGreece.png';
import tokyoJapanImage from '@/public/images/tokyoJapan.png';
import modernistRetreatImage from '@/public/images/modernistRetreat.png';
import theGlassFrameImage from '@/public/images/theGlassFrame.png';
import romanSkylineImage from '@/public/images/romanSkyline.png';
import { MagnifierIcon, ArrowRightIcon } from '@/src/app/components/icons';
import { StarIcon } from '@/src/app/components/icons/StarIcon';
import { HeartIcon } from '@/src/app/components/icons/HeartIcon';
import { InputField } from '@/src/app/components/inputs/InputField';
import { ShareIcon } from '@/app/components/icons/ShareIcon';
import { AwardIcon } from '@/app/components/icons/AwardIcon';
import { LocationIcon } from '@/app/components/icons/LocationIcon';
import { CalendarIcon } from '@/app/components/icons/CalendarIcon';
import {
  ChevronRight,
  ChevronRightIcon,
} from '@/app/components/icons/ChevronRightIcon';
import { PoolIcon } from '@/app/components/icons/PoolIcon';
import { KitchenIcon } from '@/app/components/icons/KitchenIcon';
import { SnowIcon } from '@/app/components/icons/SnowIcon';
import { WiFiIcon } from '@/app/components/icons/WiFiIcon';
import { ParkingIcon } from '@/app/components/icons/ParkingIcon';
import { UmbreallaBeachIcon } from '@/app/components/icons/UmbrellaBeachIcon';

export default function Home() {
  return (
    <main className='mx-auto mb-12 w-full'>
      <section className='mt-8 px-6'>
        <div className='mx-auto flex max-w-[1280px] flex-col gap-2'>
          <h1 className='text-black-191c1e text-[48px] font-bold'>
            Azure Horizon Infinity Villa
          </h1>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <StarIcon className='fill-green-0d9488 h-5 w-5' />
              <div className='text-black-45464d flex items-center gap-4'>
                <span className=''>4.98 · 124 reviews </span>
                <span>·</span>
                <span className='font-semibold underline'>
                  Santorini, Greece
                </span>
              </div>
            </div>
            <div className='fill-black-191c1e text-black-191c1e flex items-center gap-8'>
              <div className='flex items-center gap-2'>
                <ShareIcon className='h-5 w-5' />
                <span>Share</span>
              </div>
              <div className='flex items-center gap-2'>
                <HeartIcon className='h-5 w-5' />
                <span>Save</span>
              </div>
            </div>
          </div>

          <div className='mt-4 grid grid-cols-2 gap-3 overflow-hidden rounded-[12px]'>
            <Image src={beachFrontImage} alt='' className='object-cover' />
            <div className='grid grid-cols-2 gap-3'>
              <Image src={beachFrontImage} alt='' className='object-cover' />
              <Image src={beachFrontImage} alt='' className='object-cover' />
              <Image src={beachFrontImage} alt='' className='object-cover' />
              <Image src={beachFrontImage} alt='' className='object-cover' />
            </div>
          </div>
        </div>
      </section>
      <div className='flex gap-10'>
        <section className='mt-20 px-6'>
          <div className='mx-auto flex max-w-[1280px] gap-2'>
            <div className='flex w-full flex-col'>
              <div className='border-gray-cfcfcf flex items-center justify-between border-b pb-8'>
                <div className='flex flex-col gap-1'>
                  <h2 className='text-black-191c1e text-2xl font-semibold'>
                    Entire villa hosted by Eleni
                  </h2>
                  <span className='text-black-45464d'>
                    10 guests · 5 bedrooms · 6 beds · 5.5 baths
                  </span>
                </div>
                <Image
                  src={avatarImage}
                  alt=''
                  className='h-14 w-14 rounded-full object-cover'
                />
              </div>
              <div className='text-black-191c1e fill-black-191c1e mt-8 flex flex-col gap-6'>
                <div className='flex gap-4'>
                  <AwardIcon />
                  <div className='flex flex-col'>
                    <p>Eleni is a Superhost</p>
                    <p className='text-black-45464d text-sm'>
                      Superhosts are experienced, highly rated hosts who are
                      committed to providing great stays for guests.
                    </p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <LocationIcon />
                  <div className='flex flex-col'>
                    <p>Great location</p>
                    <p className='text-black-45464d text-sm'>
                      95% of recent guests gave the location a 5-star rating.
                    </p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <CalendarIcon />
                  <div className='flex flex-col'>
                    <p>Free cancellation for 48 hours</p>
                  </div>
                </div>
              </div>

              <div className='text-black-191c1e border-gray-cfcfcf mt-8 flex flex-col border-b pb-8'>
                <p>
                  Experience the pinnacle of Greek luxury at Azure Horizon.
                  Nestled on the cliffs of Oia, this meticulously designed villa
                  offers unobstructed views of the caldera and the legendary
                  Santorini sunset. Every detail, from the hand-carved marble
                  surfaces to the bespoke minimalist furniture, has been curated
                  to provide a sense of calm and effortless sophistication.{' '}
                  <br></br>
                  <br></br> The heart of the home is the expansive living
                  terrace, featuring a heated infinity pool and multiple
                  lounging areas. Inside, the open-plan layout creates a
                  seamless flow between the gourmet kitchen and the serene
                  living spaces...
                </p>
                <button className='mt-5 flex cursor-pointer items-center font-semibold underline'>
                  Show more <ChevronRightIcon className='h-3.5 w-3.5' />
                </button>
              </div>

              <div className='border-gray-cfcfcf mt-8 flex flex-col border-b pb-8'>
                <h2 className='text-black-191c1e text-2xl font-semibold'>
                  What this place offers
                </h2>
                <div className='text-black-191c1e fill-black-45464d mt-6 grid grid-cols-2 gap-4'>
                  <div className='flex items-center gap-2'>
                    <PoolIcon />
                    Infinity pool
                  </div>
                  <div className='flex items-center gap-2'>
                    <WiFiIcon />
                    High-speed Wifi
                  </div>
                  <div className='flex items-center gap-2'>
                    <KitchenIcon />
                    Gourmet kitchen
                  </div>
                  <div className='flex items-center gap-2'>
                    <ParkingIcon />
                    Free parking on premises
                  </div>
                  <div className='flex items-center gap-2'>
                    <SnowIcon />
                    Central air conditioning
                  </div>
                  <div className='flex items-center gap-2'>
                    <UmbreallaBeachIcon />
                    Private beach access
                  </div>
                </div>
                <Button
                  variant='roundedBorder'
                  className='!border-black-191c1e mt-6 w-fit !rounded-[8px] py-3'
                >
                  Show all 45 amenties
                </Button>
              </div>
              <div className='mt-8 flex flex-col'>
                <div className='flex items-center gap-2'>
                  <StarIcon className='fill-green-0d9488 h-5 w-5' />
                  <span className='text-black-191c1e text-2xl font-semibold'>
                    4.98 · 124 reviews
                  </span>
                </div>

                <div className='mt-8 grid grid-cols-2 gap-8'>
                  <div className='flex flex-col gap-4 rounded-[12px] bg-white p-6'>
                    <div className='flex items-center gap-3'>
                      <Image
                        src={avatarImage}
                        alt=''
                        className='h-10 w-10 rounded-full object-cover'
                      />
                      <div className='flex flex-col'>
                        <span className='text-black-191c1e'>Sarah Jenkins</span>
                        <span className='text-black-45464d text-xs'>
                          October 2023
                        </span>
                      </div>
                    </div>
                    <p className='text-black-191c1e text-sm'>
                      Absolutely magical. The views are even better than the
                      photos. Eleni was an incredible host and helped us book
                      private dinners. Highly…
                    </p>
                  </div>
                  <div className='flex flex-col gap-4 rounded-[12px] bg-white p-6'>
                    <div className='flex items-center gap-3'>
                      <Image
                        src={avatarImage}
                        alt=''
                        className='h-10 w-10 rounded-full object-cover'
                      />
                      <div className='flex flex-col'>
                        <span className='text-black-191c1e'>Sarah Jenkins</span>
                        <span className='text-black-45464d text-xs'>
                          October 2023
                        </span>
                      </div>
                    </div>
                    <p className='text-black-191c1e text-sm'>
                      Absolutely magical. The views are even better than the
                      photos. Eleni was an incredible host and helped us book
                      private dinners. Highly…
                    </p>
                  </div>
                </div>

                <Button
                  variant='roundedBorder'
                  className='!border-black-191c1e mt-6 w-fit !rounded-[8px] py-3'
                >
                  Show all reviews
                </Button>
              </div>
            </div>
          </div>
        </section>
        <div className='border-gray-cfcfcf flex h-fit w-full max-w-[380px] flex-col rounded-[16px] border bg-white p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-end gap-1'>
              <span className='text-black-191c1e text-2xl font-bold'>
                $1,200
              </span>
              <span className='text-black-45464d mb-0.5'>/ night</span>
            </div>
            <div className='flex items-center gap-1'>
              <StarIcon className='fill-green-0d9488 h-4 w-4' />
              <span className='text-black-191c1e'>4.98 · 124 reviews</span>
            </div>
          </div>
          <Button
            variant='roundedFill'
            className='bg-green-0d9488 mt-6 h-14 !rounded-[12px]'
          >
            <span className='font-bold text-white'>Reserve</span>
          </Button>

          <span className='text-black-45464d mt-4 text-center text-xs'>
            You won't be charged yet
          </span>
          <div className='text-black-191c1e border-gray-cfcfcf mt-6 flex flex-col gap-4 border-b pb-6'>
            <div className='flex items-center justify-between gap-4'>
              <span>$1,200 x 7 nights</span>
              <span>$8,400</span>
            </div>
            <div className='flex items-center justify-between gap-4'>
              <span>Cleaning fee</span>
              <span>$250</span>
            </div>
            <div className='flex items-center justify-between gap-4'>
              <span>Service fee</span>
              <span>$1,150</span>
            </div>
          </div>

          <div className='text-black-191c1e mt-6 flex justify-between gap-4 text-lg font-bold'>
            <span>Total</span>
            <span>$9,800</span>
          </div>
        </div>
      </div>
    </main>
  );
}
