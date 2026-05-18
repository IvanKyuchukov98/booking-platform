import type { Metadata } from 'next';
import { Button } from '@/app/components/buttons/Button';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import avatarImage from '@/public/images/avatar.jpg';
import { StarIcon } from '@/app/components/icons/StarIcon';
import { ShareIcon } from '@/app/components/icons/ShareIcon';
import { AwardIcon } from '@/app/components/icons/AwardIcon';
import { LocationIcon } from '@/app/components/icons/LocationIcon';
import { CalendarIcon } from '@/app/components/icons/CalendarIcon';
import { ChevronRightIcon } from '@/app/components/icons/ChevronRightIcon';
import { prisma } from '@/lib/prisma';
import { AMENITIES } from '@/lib/amenities';
import {
  activeBookingCutoff,
  addDays,
  enumerateDates,
  isoDate,
  todayIsoDate,
} from '@/lib/booking';
import { getOrCreateDbUser } from '@/lib/auth';
import { FavoriteToggle } from '@/app/components/inputs/FavoriteToggle';
import { BookingForm } from '../../components/forms/BookingForm';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const room = await prisma.room.findUnique({
    where: { id },
    select: { name: true, location: true, description: true, imageUrl: true },
  });
  if (!room) return { title: 'Stay not found' };
  return {
    title: `${room.name} in ${room.location}`,
    description: room.description ?? `Book ${room.name} in ${room.location}.`,
    openGraph: {
      title: `${room.name} · ${room.location}`,
      description: room.description ?? undefined,
      images: room.imageUrl ? [room.imageUrl] : undefined,
    },
  };
}

export default async function RoomDetail({ params }: Props) {
  const { id } = await params;
  const [room, user] = await Promise.all([
    prisma.room.findUnique({ where: { id } }),
    getOrCreateDbUser(),
  ]);
  if (!room || !room.isActive) notFound();

  const isFavorited = user
    ? !!(await prisma.favorite.findUnique({
        where: { userId_roomId: { userId: user.id, roomId: room.id } },
      }))
    : false;

  const todayIso = todayIsoDate();
  const expiredBefore = activeBookingCutoff();
  const today = new Date(`${todayIso}T00:00:00Z`);
  const activeBookings = await prisma.roomBooking.findMany({
    where: {
      roomId: room.id,
      checkOut: { gt: today },
      OR: [
        { status: 'CONFIRMED' },
        { status: 'PENDING', createdAt: { gte: expiredBefore } },
      ],
    },
    select: { checkIn: true, checkOut: true },
  });
  const reservedDates = Array.from(
    new Set(
      activeBookings.flatMap((b) =>
        enumerateDates(isoDate(b.checkIn), isoDate(b.checkOut))
      )
    )
  );
  const reservedSet = new Set(reservedDates);

  let initialCheckIn = todayIso;
  for (let i = 0; i < 365 && reservedSet.has(initialCheckIn); i++) {
    initialCheckIn = addDays(initialCheckIn, 1);
  }
  const nextReservedAfterCheckIn = [...reservedDates]
    .sort()
    .find((d) => d > initialCheckIn);
  let initialCheckOut = addDays(initialCheckIn, 7);
  if (nextReservedAfterCheckIn && initialCheckOut > nextReservedAfterCheckIn) {
    initialCheckOut = nextReservedAfterCheckIn;
  }

  return (
    <main className='mx-auto mb-12 w-full'>
      <section className='mt-8 px-6'>
        <div className='mx-auto flex max-w-[1280px] flex-col gap-2'>
          <h1 className='text-black-191c1e text-3xl font-bold md:text-[48px]'>
            {room.name}
          </h1>
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-1'>
              <StarIcon className='fill-green-0d9488 h-5 w-5' />
              <div className='text-black-45464d flex flex-wrap items-center gap-x-3 gap-y-1 md:gap-4'>
                <span>4.98 · 124 reviews </span>
                <span className='hidden md:inline'>·</span>
                <span className='font-semibold underline'>{room.location}</span>
              </div>
            </div>
            <div className='fill-black-191c1e text-black-191c1e flex items-center gap-4 md:gap-8'>
              <div className='flex items-center gap-2'>
                <ShareIcon className='h-5 w-5' />
                <span>Share</span>
              </div>
              <FavoriteToggle
                roomId={room.id}
                initialFavorited={isFavorited}
                className='flex cursor-pointer items-center gap-2 disabled:opacity-60'
                iconClassName='h-5 w-5'
                showSaveLabel
              />
            </div>
          </div>

          <div className='mt-4 grid grid-cols-1 gap-3 overflow-hidden rounded-[12px] md:grid-cols-2'>
            <div className='relative aspect-[4/3]'>
              <Image
                src={room.imageUrl}
                alt={room.name}
                fill
                sizes='(min-width: 768px) 50vw, 100vw'
                className='object-cover'
                priority
              />
            </div>
            <div className='hidden grid-cols-2 gap-3 md:grid'>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className='relative aspect-[4/3]'>
                  <Image
                    src={room.imageUrl}
                    alt=''
                    fill
                    sizes='25vw'
                    className='object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className='mt-10 px-6 md:mt-20'>
        <div className='mx-auto flex max-w-[1280px] flex-col gap-10 md:flex-row md:gap-15 lg:gap-10 xl:gap-15'>
          <section className='flex gap-2'>
            <div className='flex w-full flex-col'>
              <div className='border-gray-cfcfcf flex flex-col-reverse items-center justify-between gap-5 border-b pb-8 md:flex-row'>
                <div className='flex flex-col gap-1'>
                  <h2 className='text-black-191c1e text-2xl font-semibold'>
                    Entire stay hosted by Eleni
                  </h2>
                  <span className='text-black-45464d'>
                    {room.maxGuests} guests · {room.bedrooms} bedrooms ·{' '}
                    {room.beds} beds · {room.baths} baths
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
                  {room.description ??
                    'Experience effortless luxury in a thoughtfully designed retreat. Every detail has been curated to provide a sense of calm and sophistication.'}
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
                  {room.amenities.map((slug) => {
                    const a = AMENITIES[slug];
                    if (!a) return null;
                    const Icon = a.icon;
                    return (
                      <div key={slug} className='flex items-center gap-2'>
                        <Icon />
                        {a.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <BookingForm
            roomId={room.id}
            pricePerNight={room.pricePerNight}
            maxGuests={room.maxGuests}
            today={todayIso}
            initialCheckIn={initialCheckIn}
            initialCheckOut={initialCheckOut}
            reservedDates={reservedDates}
          />
        </div>
      </div>
      <div className='px-6'>
        <div className='mx-auto mt-8 flex max-w-[1280px] flex-col'>
          <div className='flex items-center gap-2'>
            <StarIcon className='fill-green-0d9488 h-5 w-5' />
            <span className='text-black-191c1e text-2xl font-semibold'>
              4.98 · 124 reviews
            </span>
          </div>

          <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'>
            {[0, 1].map((i) => (
              <div
                key={i}
                className='flex flex-col gap-4 rounded-[12px] bg-white p-6'
              >
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
                  Absolutely magical. The views are even better than the photos.
                  Eleni was an incredible host and helped us book private
                  dinners. Highly…
                </p>
              </div>
            ))}
          </div>

          <Button
            variant='roundedBorder'
            className='!border-black-191c1e mt-6 w-fit !rounded-[8px] py-3'
          >
            Show all reviews
          </Button>
        </div>
      </div>
    </main>
  );
}
