import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';

type Props = {
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** Full wrapper className (e.g. `mt-12 rounded-[24px] bg-white p-12`). */
  className?: string;
  /** Heading level — use `h1` when the empty state is the page's only heading. */
  as?: 'h1' | 'h2';
};

export function EmptyState({
  title,
  subtitle,
  ctaHref,
  ctaLabel,
  className = '',
  as = 'h2',
}: Props) {
  const Heading = as;
  const titleSize = as === 'h1' ? 'text-2xl' : 'text-xl';

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${className}`}
    >
      <Heading className={`text-black-191c1e ${titleSize} font-semibold`}>
        {title}
      </Heading>
      {subtitle ? <p className='text-black-45464d mt-2'>{subtitle}</p> : null}
      {ctaHref && ctaLabel ? (
        <Link href={ctaHref} className='mt-6'>
          <Button
            variant='roundedFill'
            className='bg-green-0d9488 h-12 !rounded-[12px] px-6'
          >
            <span className='font-semibold text-white'>{ctaLabel}</span>
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
