import Link from 'next/link';
import { ArrowRightIcon } from '@/app/components/icons';
import { SelectField } from '@/app/components/inputs/SelectField';
import { prisma } from '@/lib/prisma';
import { getOrCreateDbUser } from '@/lib/auth';
import type { Metadata } from 'next';
import { Sidebar } from '@/app/components/Sidebar';
import { EmptyState } from '@/app/components/EmptyState';
import { FavoriteCard } from './FavoriteCard';

export const metadata: Metadata = {
  title: 'Saved stays',
  description: 'Stays you have saved for later.',
};

export default async function FavoritesPage() {
  const user = await getOrCreateDbUser();

  if (!user) {
    return (
      <main className='bg-gray-eceef0 flex flex-1'>
        <div className='mx-auto flex w-full max-w-[1280px] flex-1 flex-col sm:flex-row'>
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
    <main className='bg-gray-eceef0 flex flex-1 px-6'>
      <div className='mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-6 sm:flex-row'>
        <Sidebar activeKey='favorites' />

        <section className='mt-6 flex w-full flex-col'>
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
              <div className='ssm:flex-row ssm:items-center ssm:gap-0 mt-8 flex flex-col justify-between gap-2'>
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

              <div className='llg:grid-cols-2 mt-6 grid gap-6 xl:grid-cols-3'>
                {favorites.map((fav) => (
                  <FavoriteCard key={fav.id} favorite={fav} />
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
