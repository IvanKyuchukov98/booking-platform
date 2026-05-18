import { Button } from '@/app/components/buttons/Button';
import Image from 'next/image';
import Link from 'next/link';
import type { Favorite, Room } from '@prisma/client';
import { StarIcon } from '@/app/components/icons/StarIcon';
import { LocationIcon } from '@/app/components/icons/LocationIcon';
import { formatPrice } from '@/lib/amenities';
import { FavoriteToggle } from '../inputs/FavoriteToggle';
import { toggleFavorite } from '../../favorites/actions';

type FavoriteWithRoom = Favorite & { room: Room };

export function FavoriteCard({ favorite }: { favorite: FavoriteWithRoom }) {
  return (
    <div className='relative flex flex-col'>
      <Image
        src={favorite.room.imageUrl}
        alt={favorite.room.name}
        width={600}
        height={600}
        className='aspect-square rounded-[24px] object-cover'
      />
      <FavoriteToggle
        roomId={favorite.roomId}
        initialFavorited={true}
        className='absolute top-4 right-4 cursor-pointer rounded-full bg-white p-2 shadow-[0px_1px_2px_0px_#0000001A] disabled:opacity-60'
        iconClassName='h-5 w-5'
        unfilledFillClass='fill-black-0f172a'
      />
      <div className='mt-4 flex h-full justify-between gap-4'>
        <div className='flex flex-col'>
          <h2 className='text-black-191c1e font-bold'>{favorite.room.name}</h2>
          <div className='mt-1 flex items-center gap-1'>
            <LocationIcon className='fill-black-45464d h-4 w-4' />
            <span className='text-black-45464d text-sm'>
              {favorite.room.location}
            </span>
          </div>
          <span className='text-black-191c1e mt-2 font-bold'>
            {formatPrice(favorite.room.pricePerNight)}{' '}
            <span className='font-normal'>night</span>
          </span>
        </div>
        <div className='mb-auto flex items-center gap-1'>
          <StarIcon className='fill-black-191c1e h-4 w-4' />
          <span className='text-black-191c1e text-sm font-semibold'>4.9</span>
        </div>
      </div>
      <div className='mt-4 flex gap-2'>
        <Link href={`/rooms/${favorite.roomId}`} className='flex-1'>
          <Button
            variant='roundedFill'
            className='bg-green-006a61 h-11 w-full !rounded-[16px] px-4'
          >
            <span className='text-sm font-semibold text-white'>
              View Property
            </span>
          </Button>
        </Link>
        <form action={toggleFavorite.bind(null, favorite.roomId)}>
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
  );
}
