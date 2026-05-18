import type { Room } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@/app/components/icons/StarIcon';
import { formatPrice } from '@/lib/amenities';
import { FavoriteToggle } from '@/app/components/inputs/FavoriteToggle';

type Props = {
  room: Room;
  isFavorited: boolean;
  dateHint: string;
};

export function TrendingCard({ room, isFavorited, dateHint }: Props) {
  return (
    <Link href={`/rooms/${room.id}`} className='relative flex flex-col'>
      <Image
        src={room.imageUrl}
        alt={room.name}
        width={400}
        height={400}
        className='aspect-square rounded-[24px] object-cover'
      />
      <FavoriteToggle
        roomId={room.id}
        initialFavorited={isFavorited}
        className='bg-gray-cfcfcf absolute top-4 right-4 cursor-pointer rounded-full p-1 disabled:opacity-60'
        iconClassName='h-6 w-6'
        unfilledFillClass='fill-black-0f172a'
      />
      <div className='mt-4 flex h-full justify-between gap-4'>
        <div className='flex flex-col'>
          <h2 className='text-black-191c1e font-bold'>{room.name}</h2>
          <span className='text-black-45464d text-sm'>{room.location}</span>
          <span className='text-black-191c1e mb-2 text-sm font-medium'>
            {dateHint}
          </span>
          <span className='text-black-191c1e mt-auto font-bold'>
            {formatPrice(room.pricePerNight)}{' '}
            <span className='font-normal'>night</span>
          </span>
        </div>
        <div className='mb-auto flex items-center gap-1'>
          <StarIcon className='fill-black-191c1e h-4 w-4' />
          <span className='text-black-191c1e text-sm font-semibold'>4.9</span>
        </div>
      </div>
    </Link>
  );
}
