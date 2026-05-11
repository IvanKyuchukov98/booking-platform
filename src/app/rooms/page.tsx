import { Button } from '@/app/components/ui/Button';
import { InputField } from '@/app/components/inputs/InputField';
import { CheckboxGroup } from '@/app/components/inputs/CheckboxGroup';
import { prisma } from '@/lib/prisma';
import { getOrCreateDbUser } from '@/lib/auth';
import { EmptyState } from '@/app/components/EmptyState';
import type { Metadata } from 'next';
import { SortDropdown } from './SortDropdown';
import { RoomCard } from './RoomCard';
import type { Prisma } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Explore stays',
  description:
    'Browse curated stays — filter by price, amenities, and location to find your next escape.',
};

type Props = {
  searchParams: Promise<{
    q?: string;
    min?: string;
    max?: string;
    amenities?: string | string[];
    propertyType?: string | string[];
    sort?: string;
  }>;
};

function asArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function parsePriceCents(s: string | undefined): number | undefined {
  if (!s) return undefined;
  const n = parseFloat(s);
  if (Number.isNaN(n) || n <= 0) return undefined;
  return Math.round(n * 100);
}

function buildOrderBy(
  sort: string | undefined
): Prisma.RoomOrderByWithRelationInput {
  switch (sort) {
    case 'price-low':
      return { pricePerNight: 'asc' };
    case 'price-high':
      return { pricePerNight: 'desc' };
    default:
      return { createdAt: 'desc' };
  }
}

export default async function RoomsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q?.trim() || undefined;
  const minCents = parsePriceCents(sp.min);
  const maxCents = parsePriceCents(sp.max);
  const amenitiesArr = asArray(sp.amenities);
  const propertyTypesArr = asArray(sp.propertyType);
  const currentSort = sp.sort ?? 'recommended';

  const where: Prisma.RoomWhereInput = { isActive: true };
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { location: { contains: q, mode: 'insensitive' } },
    ];
  }
  if (minCents !== undefined || maxCents !== undefined) {
    where.pricePerNight = {
      ...(minCents !== undefined ? { gte: minCents } : {}),
      ...(maxCents !== undefined ? { lte: maxCents } : {}),
    };
  }
  if (amenitiesArr.length > 0) {
    where.amenities = { hasEvery: amenitiesArr };
  }

  const [rooms, user] = await Promise.all([
    prisma.room.findMany({
      where,
      orderBy: buildOrderBy(currentSort),
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
        ).map((f) => f.roomId)
      )
    : new Set<string>();

  return (
    <main className='bg-gray-eceef0 flex flex-1'>
      <div className='mx-auto flex w-full max-w-[1280px] flex-1'>
        <form
          action='/rooms'
          method='get'
          className='flex w-80 flex-col bg-white p-6'
        >
          <input type='hidden' name='sort' value={currentSort} />
          <span className='text-black'>Filters</span>
          <InputField
            variant='light'
            name='q'
            type='text'
            defaultValue={q ?? ''}
            placeholder='Stay name or city'
            className='!h-9 w-full !px-3'
            label='Search'
            labelClassName='text-xs'
            inputClassName='!border-gray-c2c6d6 !rounded-[8px]'
            containerClassName='mt-4 w-full'
          />
          <span className='text-black-45464d mt-4 mb-2'>Price range</span>
          <div className='flex gap-1'>
            <InputField
              variant='light'
              name='min'
              type='number'
              defaultValue={minCents !== undefined ? minCents / 100 : ''}
              className='!h-9 w-full !px-3'
              label='Min price'
              labelClassName='text-xs'
              inputClassName='!border-gray-c2c6d6 !rounded-[8px]'
              containerClassName='w-full max-w-[300px] '
            />
            <InputField
              variant='light'
              name='max'
              type='number'
              defaultValue={maxCents !== undefined ? maxCents / 100 : ''}
              className='!h-9 w-full !px-3'
              label='Max price'
              labelClassName='text-xs'
              inputClassName='!border-gray-c2c6d6 !rounded-[8px]'
              containerClassName='w-full max-w-[300px] '
            />
          </div>
          <div className='bg-green-006a61 mt-4 mb-6 h-1 w-full rounded-full'></div>
          <CheckboxGroup
            label='Property type'
            name='propertyType'
            options={[
              { value: 'hotels', label: 'Hotels' },
              { value: 'apartments', label: 'Apartments' },
              { value: 'villas', label: 'Villas' },
              { value: 'resorts', label: 'Resorts' },
            ]}
            defaultValue={propertyTypesArr}
          />
          <CheckboxGroup
            label='Amenities'
            name='amenities'
            containerClassName='mt-6'
            options={[
              { value: 'wifi', label: 'Free Wi-Fi' },
              { value: 'pool', label: 'Swimming Pool' },
              { value: 'kitchen', label: 'Full Kitchen' },
              { value: 'parking', label: 'Parking' },
            ]}
            defaultValue={amenitiesArr}
          />
          <Button
            variant='roundedFill'
            className='mt-6 h-12 !rounded-[16px] bg-black px-6'
          >
            <span className='text-white'>Show Results</span>
          </Button>
        </form>
        <section className='flex w-full flex-col gap-8 p-6'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <span className='text-gray-76777D text-sm font-medium'>
                {rooms.length} STAYS FOUND
              </span>
              <span className='text-black'>Featured stays</span>
            </div>
            <SortDropdown />
          </div>
          {rooms.length === 0 ? (
            <EmptyState
              title='No stays match your filters'
              subtitle='Try widening the price range or removing some amenities.'
              ctaHref='/rooms'
              ctaLabel='Clear filters'
              className='rounded-[16px] bg-white p-12'
            />
          ) : (
            <div className='flex flex-col gap-6'>
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isFavorited={favoriteIds.has(room.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
