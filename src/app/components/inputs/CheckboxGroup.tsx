'use client';
import { useState } from 'react';

type Variant = 'light' | 'dark';

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

const variantClass: Record<
  Variant,
  { boxBorder: string; labelText: string; headerText: string }
> = {
  light: {
    boxBorder: 'border-gray-c2c6d6',
    labelText: 'text-black-191c1e',
    headerText: 'text-gray-1e1d1c',
  },
  dark: {
    boxBorder: 'border-white',
    labelText: 'text-white',
    headerText: 'text-white',
  },
};

type CheckboxGroupProps = {
  label?: string;
  options: Option[];
  name?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  variant?: Variant;
  error?: string;
  description?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
};

export function CheckboxGroup({
  label,
  options,
  name,
  value,
  defaultValue = [],
  onChange,
  variant = 'light',
  error,
  description,
  required = false,
  containerClassName = '',
  labelClassName = '',
}: CheckboxGroupProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const selected = isControlled ? value : internal;
  const v = variantClass[variant];

  const toggle = (val: string) => {
    const next = selected.includes(val)
      ? selected.filter((x) => x !== val)
      : [...selected, val];
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <span className={`text-black-45464d ${v.headerText} ${labelClassName}`}>
          {label}
          {required && <span className='text-[#FF6C22]'>*</span>}
        </span>
      )}

      <div className={`${label ? 'mt-3' : ''} flex flex-col gap-3`}>
        {options.map((opt) => {
          const checked = selected.includes(opt.value);
          return (
            <label
              key={opt.value}
              className={`flex items-center gap-3 ${
                opt.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              }`}
            >
              <input
                type='checkbox'
                name={name}
                value={opt.value}
                checked={checked}
                disabled={opt.disabled}
                onChange={() => toggle(opt.value)}
                className='sr-only'
              />
              <span
                className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  checked
                    ? 'border-green-006a61 bg-green-006a61'
                    : `bg-white ${v.boxBorder}`
                }`}
              >
                {checked && (
                  <svg viewBox='0 0 16 16' className='h-4.5 w-4.5 fill-white'>
                    <path d='M6.4 11.4 2.6 7.6l1.4-1.4 2.4 2.4L12 3l1.4 1.4-7 7Z' />
                  </svg>
                )}
              </span>
              <span className={` ${v.labelText}`}>{opt.label}</span>
            </label>
          );
        })}
      </div>

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
