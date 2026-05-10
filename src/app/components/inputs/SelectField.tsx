'use client';
import { type ComponentProps } from 'react';

type Variant = 'light' | 'dark';

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

const variantClass: Record<
  Variant,
  { select: string; border: string; headerText: string; chevron: string }
> = {
  light: {
    select: 'bg-white text-black-191c1e',
    border: 'border-gray-c2c6d6',
    headerText: 'text-gray-1e1d1c',
    chevron: 'fill-black-191c1e',
  },
  dark: {
    select: 'bg-transparent text-white',
    border: 'border-white',
    headerText: 'text-white',
    chevron: 'fill-white',
  },
};

type SelectFieldProps = Omit<ComponentProps<'select'>, 'children'> & {
  variant?: Variant;
  label?: string;
  description?: string;
  error?: string;
  options: Option[];
  placeholder?: string;
  containerClassName?: string;
  labelClassName?: string;
};

export function SelectField({
  variant = 'light',
  label,
  description,
  error,
  options,
  placeholder,
  containerClassName = '',
  labelClassName = '',
  className = '',
  required = false,
  defaultValue,
  value,
  ...props
}: SelectFieldProps) {
  const v = variantClass[variant];
  const resolvedDefault =
    defaultValue ?? (placeholder && value === undefined ? '' : undefined);

  return (
    <div className={` ${containerClassName}`}>
      <label className='block'>
        {label && (
          <span
            className={`text-black-45464d ${v.headerText} ${labelClassName}`}
          >
            {label}
            {required && <span className='text-[#FF6C22]'>*</span>}
          </span>
        )}

        <div className={`relative ${label ? 'mt-1' : ''}`}>
          <select
            required={required}
            defaultValue={resolvedDefault}
            value={value}
            className={`${v.select} flex h-[44px] w-full appearance-none items-center rounded-xl border px-3 pr-10 transition-opacity focus:outline-none disabled:opacity-70 ${
              error ? 'border-[#E93655]' : v.border
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value='' disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            viewBox='0 0 16 16'
            className={`pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 ${v.chevron}`}
            aria-hidden='true'
          >
            <path d='M3.5 5.5 8 10l4.5-4.5L11 4 8 7 5 4Z' />
          </svg>
        </div>
      </label>

      {description && !error && (
        <span className='font-onest mt-2 block pr-4 text-sm font-normal text-[#64748B]'>
          {description}
        </span>
      )}
      {error && (
        <span className='font-onest mt-2 block pr-4 text-sm font-normal text-[#E93655]'>
          {error}
        </span>
      )}
    </div>
  );
}
