import { Button } from '@/app/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@/app/components/icons/StarIcon';
import { HeartIcon } from '@/app/components/icons/HeartIcon';
import { LocationIcon } from '@/app/components/icons/LocationIcon';
import { ArrowRightIcon } from '@/app/components/icons';
import { SelectField } from '@/app/components/inputs/SelectField';
import { prisma } from '@/lib/prisma';
import { getOrCreateDbUser } from '@/lib/auth';
import { formatPrice } from '@/lib/amenities';
import type { Metadata } from 'next';
import { Sidebar } from '@/app/components/Sidebar';
import { EmptyState } from '@/app/components/EmptyState';
import { FavoriteToggle } from './FavoriteToggle';
import { toggleFavorite } from './actions';

export const metadata: Metadata = {
  title: 'Saved stays',
  description: 'Stays you have saved for later.',
};

export default async function FavoritesPage() {
  const user = await getOrCreateDbUser();

  if (!user) {
    return (
      <main className='bg-gray-eceef0 flex flex-1'>
        <div className='mx-auto flex w-full max-w-[1280px] flex-1'>
          <Sidebar activeKey='favorites' />
          <section className='flex w-full flex-col items-center justify-center p-6'>
            <EmptyState
              as='h1'
              title='Sign in to see your favorites'
              subtitle='Save stays you love and revisit them anytime.'
              ctaHref='/sign-in'
              ctaLabel='Sign in'
            />
          </section>
        </div>
      </main>
    );
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: { room: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className='bg-gray-eceef0 flex flex-1'>
      <div className='mx-auto flex w-full max-w-[1280px] flex-1'>
        <Sidebar activeKey='favorites' />

        <section className='flex w-full flex-col p-6'>
          <h1 className='text-black-191c1e text-[32px] font-semibold'>
            Saved Stays
          </h1>
          <p className='text-black-45464d'>
            {favorites.length === 0
              ? 'You haven’t saved any stays yet — start exploring.'
              : `${favorites.length} stay${favorites.length === 1 ? '' : 's'} you’ve loved. Ready when you are.`}
          </p>

          {favorites.length > 0 ? (
            <>
              <div className='mt-8 flex items-center justify-between'>
                <h2 className='text-black-191c1e text-2xl font-semibold'>
                  Your Favorites
                </h2>
                <SelectField
                  name='sortFavorites'
                  placeholder='Sort by:'
                  containerClassName='max-w-[220px] w-full'
                  options={[
                    { value: 'recent', label: 'Recently saved' },
                    { value: 'price-low', label: 'Price low to high' },
                    { value: 'price-high', label: 'Price high to low' },
                    { value: 'rating', label: 'Rating' },
                  ]}
                />
              </div>

              <div className='mt-6 grid grid-cols-3 gap-6'>
                {favorites.map((fav) => (
                  <div key={fav.id} className='relative flex flex-col'>
                    <Image
                      src={fav.room.imageUrl}
                      alt={fav.room.name}
                      width={400}
                      height={400}
                      className='aspect-square rounded-[24px] object-cover'
                    />
                    <FavoriteToggle
                      roomId={fav.roomId}
                      initialFavorited={true}
                      className='absolute top-4 right-4 cursor-pointer rounded-full bg-white p-2 shadow-[0px_1px_2px_0px_#0000001A] disabled:opacity-60'
                      iconClassName='h-5 w-5'
                      unfilledFillClass='fill-black-0f172a'
                    />
                    <div className='mt-4 flex h-full justify-between gap-4'>
                      <div className='flex flex-col'>
                        <h2 className='text-black-191c1e font-bold'>
                          {fav.room.name}
                        </h2>
                        <div className='mt-1 flex items-center gap-1'>
                          <LocationIcon className='fill-black-45464d h-4 w-4' />
                          <span className='text-black-45464d text-sm'>
                            {fav.room.location}
                          </span>
                        </div>
                        <span className='text-black-191c1e mt-2 font-bold'>
                          {formatPrice(fav.room.pricePerNight)}{' '}
                          <span className='font-normal'>night</span>
                        </span>
                      </div>
                      <div className='mb-auto flex items-center gap-1'>
                        <StarIcon className='fill-black-191c1e h-4 w-4' />
                        <span className='text-black-191c1e text-sm font-semibold'>
                          4.9
                        </span>
                      </div>
                    </div>
                    <div className='mt-4 flex gap-2'>
                      <Link
                        href={`/rooms/${fav.roomId}`}
                        className='flex-1'
                      >
                        <Button
                          variant='roundedFill'
                          className='bg-green-006a61 h-11 w-full !rounded-[16px] px-4'
                        >
                          <span className='text-sm font-semibold text-white'>
                            View Property
                          </span>
                        </Button>
                      </Link>
                      <form action={toggleFavorite.bind(null, fav.roomId)}>
                        <Button
                          variant='roundedBorder'
                          className='!border-gray-c2c6d6 h-11 !rounded-[16px] px-4'
                        >
                          <span className='text-black-191c1e text-sm font-semibold'>
                            Remove
                          </span>
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              title='No favorites yet'
              subtitle='Browse stays and tap the heart to save them here.'
              ctaHref='/rooms'
              ctaLabel='Explore stays'
              className='mt-8 rounded-[24px] bg-white p-12'
            />
          )}

          <div className='mt-12 flex items-center justify-between'>
            <div className='flex flex-col'>
              <h2 className='text-black-191c1e text-2xl font-semibold'>
                Keep exploring
              </h2>
              <span className='text-black-45464d'>
                More curated stays you might love.
              </span>
            </div>
            <Link
              href='/rooms'
              className='flex cursor-pointer items-center gap-2'
            >
              <span className='text-green-006a61 font-semibold'>
                Browse all stays
              </span>
              <ArrowRightIcon className='fill-green-006a61 h-5 w-5' />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
