import Link from 'next/link';
import { ArrowRightIcon } from '@/app/components/icons';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { getOrCreateDbUser } from '@/lib/auth';
import { Sidebar } from '@/app/components/layout/Sidebar';
import { EmptyState } from '@/app/components/ui/EmptyState';
import { BookingCard } from '../components/cards/BookingCard';

export const metadata: Metadata = {
  title: 'Your trips',
  description: 'Manage your upcoming and past stays.',
};

type Props = {
  searchParams: Promise<{
    bookingId?: string;
    payment?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: Props) {
  const sp = await searchParams;
  const user = await getOrCreateDbUser();

  if (!user) {
    return (
      <main className='bg-gray-eceef0 flex flex-1 p-6'>
        <div className='mx-auto flex w-full max-w-[1280px] flex-1 flex-col sm:flex-row'>
          <Sidebar activeKey='trips' />
          <section className='flex w-full flex-col items-center justify-center'>
            <EmptyState
              as='h1'
              title='Sign in to see your trips'
              subtitle='Your bookings and travel credits live here.'
              ctaHref='/sign-in'
              ctaLabel='Sign in'
            />
          </section>
        </div>
      </main>
    );
  }

  const now = new Date();

  const upcoming = await prisma.roomBooking.findMany({
    where: {
      userId: user.id,
      status: { in: ['CONFIRMED', 'PENDING'] },
      checkOut: { gt: now },
    },
    include: { room: true },
    orderBy: { checkIn: 'asc' },
  });

  const past = await prisma.roomBooking.findMany({
    where: {
      userId: user.id,
      OR: [
        { status: 'CONFIRMED', checkOut: { lte: now } },
        { status: 'CANCELLED' },
      ],
    },
    include: { room: true },
    orderBy: { checkIn: 'desc' },
    take: 6,
  });

  const successBooking =
    sp.payment === 'success' && sp.bookingId
      ? upcoming.find((b) => b.id === sp.bookingId)
      : null;

  const firstName = user.name?.split(' ')[0] ?? 'there';
  const upcomingCount = upcoming.length;
  const subtitle =
    upcomingCount === 0
      ? 'No upcoming trips yet — start exploring stays.'
      : `You have ${upcomingCount} upcoming trip${upcomingCount > 1 ? 's' : ''}. Adventure awaits!`;

  return (
    <main className='bg-gray-eceef0 flex flex-1 px-6'>
      <div className='mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-6 sm:flex-row'>
        <Sidebar activeKey='trips' />
        <section className='mt-6 flex w-full flex-col'>
          <h1 className='text-black-191c1e text-[32px] font-semibold'>
            Welcome back, {firstName}
          </h1>
          <p className='text-black-45464d'>{subtitle}</p>

          {successBooking ? (
            <div className='border-green-006a61 bg-green-86f2e4 mt-6 flex items-center gap-4 rounded-[16px] border p-4'>
              <div className='flex flex-col'>
                <span className='text-green-006f66 text-xs font-bold'>
                  {successBooking.status === 'CONFIRMED'
                    ? 'BOOKING CONFIRMED'
                    : 'PAYMENT RECEIVED'}
                </span>
                <span className='text-black-191c1e mt-0.5 text-sm'>
                  {successBooking.status === 'CONFIRMED'
                    ? `Your stay at ${successBooking.room.name} is all set. We can't wait to host you.`
                    : `Your booking at ${successBooking.room.name} is being confirmed — refresh in a few seconds.`}
                </span>
              </div>
            </div>
          ) : null}
          {upcoming.length > 0 ? (
            <>
              <div className='mt-8 flex items-center justify-between'>
                <h2 className='text-black-191c1e text-2xl font-semibold'>
                  Upcoming Trips
                </h2>
                <Link
                  href='/rooms'
                  className='flex cursor-pointer items-center gap-2'
                >
                  <span className='text-green-006a61 font-semibold'>
                    View all
                  </span>
                  <ArrowRightIcon className='fill-green-006a61 h-5 w-5' />
                </Link>
              </div>
              <div className='mt-6 grid grid-cols-2 gap-6'>
                {upcoming.map((b) => (
                  <BookingCard key={b.id} booking={b} isUpcoming />
                ))}
              </div>
            </>
          ) : null}
          {past.length > 0 ? (
            <>
              <div className='mt-12 flex items-center justify-between'>
                <h2 className='text-black-191c1e text-2xl font-semibold'>
                  Past Trips
                </h2>
              </div>
              <div className='llg:grid-cols-2 mt-6 grid gap-6'>
                {past.map((b) => (
                  <BookingCard key={b.id} booking={b} isUpcoming={false} />
                ))}
              </div>
            </>
          ) : null}
          {upcoming.length === 0 && past.length === 0 ? (
            <EmptyState
              title='No bookings yet'
              subtitle='Find your next stay in our curated catalog.'
              ctaHref='/rooms'
              ctaLabel='Explore stays'
              className='mt-12 rounded-[24px] bg-white p-12'
            />
          ) : null}
        </section>
      </div>
    </main>
  );
}
