'use client';

import { useState, useTransition, type MouseEvent } from 'react';
import { HeartIcon } from '@/app/components/icons/HeartIcon';
import { toggleFavorite } from './actions';

type Props = {
  roomId: string;
  initialFavorited: boolean;
  className?: string;
  iconClassName?: string;
  /** Fill class applied when NOT favorited. When favorited, fill-red-ba1a1a is always applied. */
  unfilledFillClass?: string;
  /** When true, render "Save"/"Saved" label next to the heart. */
  showSaveLabel?: boolean;
};

export function FavoriteToggle({
  roomId,
  initialFavorited,
  className,
  iconClassName = '',
  unfilledFillClass = '',
  showSaveLabel = false,
}: Props) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, startTransition] = useTransition();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pending) return;
    setFavorited((prev) => !prev);
    startTransition(async () => {
      try {
        await toggleFavorite(roomId);
      } catch {
        setFavorited((prev) => !prev);
      }
    });
  };

  const fillClass = favorited ? 'fill-red-ba1a1a' : unfilledFillClass;

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={pending}
      aria-pressed={favorited}
      aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
      className={className}
    >
      <HeartIcon className={`${iconClassName} ${fillClass}`.trim()} />
      {showSaveLabel ? <span>{favorited ? 'Saved' : 'Save'}</span> : null}
    </button>
  );
}
