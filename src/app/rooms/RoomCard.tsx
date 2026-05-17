import type { Room } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { StarIcon } from '@/app/components/icons/StarIcon';
import { AMENITIES, formatPrice } from '@/lib/amenities';
import { FavoriteToggle } from '@/app/favorites/FavoriteToggle';

type Props = {
  room: Room;
  isFavorited: boolean;
};

export function RoomCard({ room, isFavorited }: Props) {
  const tags = room.amenities
    .slice(0, 3)
    .map((slug) => AMENITIES[slug]?.short ?? slug);

  return (
    <div className='llg:flex-row flex flex-col overflow-hidden rounded-[16px] bg-white'>
      <div className='llg:max-w-60 llg:aspect-auto llg:h-full relative aspect-[4/3] max-h-[300px] w-full shrink-0 self-stretch'>
        <Image
          src={room.imageUrl}
          alt={room.name}
          fill
          sizes='240px'
          className='object-cover'
        />
        <FavoriteToggle
          roomId={room.id}
          initialFavorited={isFavorited}
          className='bg-gray-cfcfcf absolute top-4 right-4 cursor-pointer rounded-full p-1 disabled:opacity-60'
          iconClassName='h-6 w-6'
          unfilledFillClass='fill-black-0f172a'
        />
      </div>

      <div className='flex w-full flex-col p-6'>
        <div className='flex items-center justify-between'>
          <span className='text-green-006a61 text-xs font-bold'>
            FEATURED STAY
          </span>
          <div className='flex items-center gap-1'>
            <StarIcon className='fill-green-006a61 h-4 w-4' />
            <span className='text-black-191c1e text-sm font-bold'>4.9</span>
            <span className='text-gray-76777D text-sm font-medium'>
              ({room.maxGuests * 16})
            </span>
          </div>
        </div>

        <h2 className='font-semibold text-black'>{room.name}</h2>
        <span className='text-black-45464d'>{room.location}</span>
        <div className='my-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <span
              key={tag}
              className='bg-gray-e6e8eA text-black-191c1e rounded-full px-3 py-1 text-xs font-semibold text-nowrap'
            >
              {tag}
            </span>
          ))}
        </div>

        <div className='mt-auto flex items-end justify-between'>
          <span className='text-black'>
            {formatPrice(room.pricePerNight)}
            <span className='text-gray-76777D text-sm font-medium'>
              {' '}
              / night
            </span>
          </span>
          <Link href={`/rooms/${room.id}`}>
            <Button
              variant='roundedFill'
              className='bg-green-006a61 h-12 !rounded-[16px] px-6'
            >
              <span className='text-white'>View Property</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
