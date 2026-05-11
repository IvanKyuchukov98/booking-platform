import { Button } from '@/app/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import heroImage from '@/public/images/Hero.png';
import uniquqImage from '@/public/images/unique.png';
import beachFrontImage from '@/public/images/beachFront.png';
import cabinsImage from '@/public/images/cabins.png';
import urbanImage from '@/public/images/urban.png';
import { MagnifierIcon, ArrowRightIcon } from '@/app/components/icons';
import { InputField } from '@/app/components/inputs/InputField';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/amenities';
import { getOrCreateDbUser } from '@/lib/auth';
import { TrendingCard } from '@/app/components/TrendingCard';

const TRENDING_DATE_HINTS = [
  'Oct 22 – 27',
  'Nov 05 – 10',
  'Dec 12 – 17',
  'Jan 10 – 15',
];

export default async function Home() {
  const [topDestinations, trending, user] = await Promise.all([
    prisma.room.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
      take: 3,
    }),
    prisma.room.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
    getOrCreateDbUser(),
  ]);

  const favoriteIds = user
    ? new Set(
        (
          await prisma.favorite.findMany({
            where: { userId: user.id },
            select: { roomId: true },
          })
        ).map((f) => f.roomId),
      )
    : new Set<string>();
  return (
    <main className='mx-auto mb-12 w-full'>
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
            <form
              action='/rooms'
              method='get'
              className='mx-auto flex w-full max-w-[400px] items-center rounded-full bg-white p-2'
            >
              <input
                name='q'
                placeholder='Search for rooms'
                className='text-gray-94a3b8 w-full pl-3 text-xl outline-none'
              />
              <button
                type='submit'
                className='bg-green-0d9488 flex cursor-pointer items-center justify-center rounded-full p-2'
              >
                <MagnifierIcon className='h-5 w-5 fill-white' />
              </button>
            </form>
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
            {topDestinations.map((room) => (
              <div
                key={room.id}
                className='flex flex-col overflow-hidden rounded-[24px] bg-white'
              >
                <Image
                  src={room.imageUrl}
                  alt={room.location}
                  width={600}
                  height={400}
                  className='max-h-60 w-full object-cover'
                />
                <div className='flex h-full flex-col p-8'>
                  <h2 className='text-black-191c1e mb-2'>{room.location}</h2>
                  <p className='text-black-45464d mb-4'>
                    {room.description}
                  </p>
                  <div className='mt-auto flex items-center justify-between'>
                    <span className='text-green-006a61 font-bold'>
                      {formatPrice(room.pricePerNight)}
                      <span className='text-black-45464d text-sm font-medium'>
                        /night
                      </span>
                    </span>
                    <Link href={`/rooms/${room.id}`}>
                      <Button
                        variant='roundedBorder'
                        className='text-black-191c1e'
                      >
                        Explore
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
            {trending.map((room, i) => (
              <TrendingCard
                key={room.id}
                room={room}
                isFavorited={favoriteIds.has(room.id)}
                dateHint={
                  TRENDING_DATE_HINTS[i % TRENDING_DATE_HINTS.length]
                }
              />
            ))}
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
