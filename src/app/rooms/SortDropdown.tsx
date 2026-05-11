'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SelectField } from '@/app/components/inputs/SelectField';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price low' },
  { value: 'price-high', label: 'Price high' },
  { value: 'rating', label: 'Rating' },
];

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get('sort') ?? 'recommended';

  return (
    <SelectField
      name='sort'
      placeholder='Sort by:'
      containerClassName='max-w-[200px] w-full'
      value={current}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        router.push(`${pathname}?${params.toString()}`);
      }}
      options={SORT_OPTIONS}
    />
  );
}
