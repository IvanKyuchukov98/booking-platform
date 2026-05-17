'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import { InputField } from '@/app/components/inputs/InputField';
import { CheckboxGroup } from '@/app/components/inputs/CheckboxGroup';

type Props = {
  q: string;
  minCents: number | undefined;
  maxCents: number | undefined;
  amenitiesArr: string[];
  propertyTypesArr: string[];
  currentSort: string;
};

export function FiltersPanel({
  q,
  minCents,
  maxCents,
  amenitiesArr,
  propertyTypesArr,
  currentSort,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='border-gray-c2c6d6 mx-6 mt-6 flex h-10 items-center gap-2 self-start rounded-full border bg-white px-4 text-sm font-medium text-black sm:hidden'
        aria-label='Open filters'
        aria-expanded={open}
      >
        <svg
          viewBox='0 0 20 20'
          aria-hidden='true'
          className='h-4 w-4 fill-current'
        >
          <path d='M3 5h14v2H3V5Zm3 4h8v2H6V9Zm2 4h4v2H8v-2Z' />
        </svg>
        Filters
      </button>

      {open && (
        <div
          className='fixed inset-0 z-40 bg-black/40 sm:hidden'
          onClick={() => setOpen(false)}
          aria-hidden='true'
        />
      )}

      <form
        action='/rooms'
        method='get'
        role='dialog'
        aria-modal={open ? 'true' : undefined}
        aria-label='Filters'
        className={`fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col overflow-y-auto bg-white p-6 transition-transform duration-300 sm:static sm:my-6 sm:max-w-none sm:translate-x-0 sm:rounded-[24px] sm:transition-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <input type='hidden' name='sort' value={currentSort} />
        <div className='flex items-center justify-between'>
          <span className='text-black'>Filters</span>
          <button
            type='button'
            onClick={() => setOpen(false)}
            className='-mr-2 flex h-9 w-9 items-center justify-center rounded-full text-black sm:hidden'
            aria-label='Close filters'
          >
            <svg
              viewBox='0 0 20 20'
              aria-hidden='true'
              className='h-5 w-5 fill-current'
            >
              <path d='M5.3 4 4 5.3 8.7 10 4 14.7 5.3 16l4.7-4.7L14.7 16 16 14.7 11.3 10 16 5.3 14.7 4 10 8.7 5.3 4Z' />
            </svg>
          </button>
        </div>
        <InputField
          variant='light'
          name='q'
          type='text'
          defaultValue={q}
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
    </>
  );
}
