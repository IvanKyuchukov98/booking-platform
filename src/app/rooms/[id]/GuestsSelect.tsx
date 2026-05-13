'use client';

type Props = {
  name: string;
  value: number;
  maxGuests: number;
  open: boolean;
  onToggle: () => void;
  onChange: (n: number) => void;
};

function labelFor(n: number): string {
  return `${n} ${n === 1 ? 'guest' : 'guests'}`;
}

export function GuestsSelect({
  name,
  value,
  maxGuests,
  open,
  onToggle,
  onChange,
}: Props) {
  return (
    <div className='relative w-full'>
      <input type='hidden' name={name} value={value} />
      <button
        type='button'
        onClick={onToggle}
        aria-haspopup='listbox'
        aria-expanded={open}
        className='flex w-full cursor-pointer flex-col p-3 text-left'
      >
        <span className='text-black-45464d text-xs font-bold'>GUESTS</span>
        <div className='mt-0.5 flex items-center justify-between'>
          <span className='text-black-191c1e text-sm'>{labelFor(value)}</span>
          <svg
            viewBox='0 0 16 16'
            className={`fill-black-191c1e pointer-events-none h-4 w-4 transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden='true'
          >
            <path d='M3.5 5.5 8 10l4.5-4.5L11 4 8 7 5 4Z' />
          </svg>
        </div>
      </button>

      {open ? (
        <ul
          role='listbox'
          className='border-gray-cfcfcf absolute top-full right-0 left-0 z-20 mt-2 max-h-[240px] overflow-y-auto rounded-[12px] border bg-white p-2 shadow-lg'
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => {
            const selected = n === value;
            return (
              <li key={n} role='option' aria-selected={selected}>
                <button
                  type='button'
                  onClick={() => onChange(n)}
                  className={`flex w-full cursor-pointer items-center rounded-[8px] px-3 py-2 text-sm ${
                    selected
                      ? 'bg-green-0d9488 font-semibold text-white'
                      : 'text-black-191c1e hover:bg-gray-cfcfcf/40'
                  }`}
                >
                  {labelFor(n)}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
