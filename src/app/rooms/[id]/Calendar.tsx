'use client';

import { useState } from 'react';
import { ChevronRightIcon } from '@/app/components/icons/ChevronRightIcon';

type Props = {
  selected: string | null;
  minDate: string;
  disabledDates: Set<string>;
  onSelect: (iso: string) => void;
};

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function ymd(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function Calendar({
  selected,
  minDate,
  disabledDates,
  onSelect,
}: Props) {
  const anchor = selected ?? minDate;
  const [year, monthIdx] = anchor.split('-').map(Number);
  const [viewYear, setViewYear] = useState(year);
  const [viewMonth, setViewMonth] = useState(monthIdx - 1);

  const firstOfMonth = new Date(Date.UTC(viewYear, viewMonth, 1));
  const startDay = firstOfMonth.getUTCDay();
  const daysInMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  function shift(delta: number) {
    const next = new Date(Date.UTC(viewYear, viewMonth + delta, 1));
    setViewYear(next.getUTCFullYear());
    setViewMonth(next.getUTCMonth());
  }

  return (
    <div className='border-gray-cfcfcf w-[280px] rounded-[12px] border bg-white p-3 shadow-lg'>
      <div className='flex items-center justify-between px-1 pb-2'>
        <button
          type='button'
          onClick={() => shift(-1)}
          className='text-black-191c1e hover:bg-gray-cfcfcf/40 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full'
          aria-label='Previous month'
        >
          <ChevronRightIcon className='h-3.5 w-3.5 rotate-180' />
        </button>
        <span className='text-black-191c1e text-sm font-semibold'>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type='button'
          onClick={() => shift(1)}
          className='text-black-191c1e hover:bg-gray-cfcfcf/40 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full'
          aria-label='Next month'
        >
          <ChevronRightIcon className='h-3.5 w-3.5' />
        </button>
      </div>

      <div className='text-black-45464d grid grid-cols-7 gap-1 pb-1 text-center text-[11px] font-semibold'>
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1'>
        {cells.map((day, i) => {
          if (day === null) return <div key={i} className='h-8' />;
          const iso = ymd(viewYear, viewMonth, day);
          const isPast = iso < minDate;
          const isReserved = disabledDates.has(iso);
          const isDisabled = isPast || isReserved;
          const isSelected = iso === selected;

          const base =
            'h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm';
          let cls: string;
          if (isSelected) {
            cls = `${base} bg-green-0d9488 text-white font-semibold cursor-pointer`;
          } else if (isDisabled) {
            cls = `${base} text-black-45464d/40 line-through cursor-not-allowed`;
          } else {
            cls = `${base} text-black-191c1e hover:bg-gray-cfcfcf/40 cursor-pointer`;
          }

          return (
            <button
              key={i}
              type='button'
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(iso)}
              className={cls}
              aria-label={iso}
              aria-disabled={isDisabled}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
