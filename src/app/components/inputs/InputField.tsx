'use client';
import { useState, type ComponentProps } from 'react';
import { EyeIcon } from '@/src/app/components/icons/EyeIcon';
import { EyeCrossedIcon } from '@/src/app/components/icons/EyeCrossedIcon';

type Variant = 'light' | 'dark';

const variantClass: Record<Variant, { input: string; border: string }> = {
  light: {
    input: 'text-white placeholder-white/40 bg-white/10',
    border: 'border-white/20',
  },
  dark: {
    input: 'text-white placeholder-white/40 bg-white/10',
    border: 'border-white/20',
  },
};

type InputFieldProps = ComponentProps<'input'> & {
  variant?: Variant;
  label?: string;
  description?: string;
  error?: string;
  visibilityToggle?: boolean;
  containerClassName?: string;
  labelClassName?: string;
};

export function InputField({
  variant = 'dark',
  label,
  description,
  error,
  visibilityToggle = false,
  containerClassName = '',
  labelClassName = '',
  className = '',
  type = 'text',
  required = false,
  ...props
}: InputFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const renderType = visibilityToggle
    ? isVisible
      ? 'text'
      : 'password'
    : type;
  const v = variantClass[variant];

  return (
    <div className={` ${containerClassName}`}>
      <label className='relative'>
        {label && (
          <span
            className={`text-gray-1e1d1c font-onest font-normal ${labelClassName}`}
          >
            {label}
            {required && <span className='text-[#FF6C22]'>*</span>}
          </span>
        )}

        <input
          type={renderType}
          required={required}
          className={`${v.input} ${label ? 'mt-1' : ''} flex h-[44px] items-center justify-center rounded-full border px-5 transition-opacity disabled:opacity-70 ${error ? 'border-[#E93655]' : v.border} ${className}`}
          {...props}
        />

        {visibilityToggle && (
          <button
            type='button'
            className='absolute top-12 right-6 z-30 -translate-y-1/2 transform'
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? <EyeCrossedIcon /> : <EyeIcon />}
          </button>
        )}
      </label>

      {description && !error && (
        <span className='font-onest mt-1 block pr-4 text-sm font-normal text-[#64748B]'>
          {description}
        </span>
      )}
      {error && (
        <span className='font-onest mt-1 block pr-4 text-sm font-normal text-[#E93655]'>
          {error}
        </span>
      )}
    </div>
  );
}
