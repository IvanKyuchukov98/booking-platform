import type { ComponentProps } from 'react';

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'roundedBorder'
  | 'roundedFill';
type Size = 'sm' | 'md';

const variantClass: Record<Variant, string> = {
  primary:
    'bg-blue-0058be text-white hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:active:scale-100',
  secondary:
    'bg-white border border-gray-c2c6d6 text-white-1a1c1c hover:bg-white-f3f3f3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'text-gray-5f5e5e hover:text-white-1a1c1c hover:bg-white-f3f3f3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
  destructive:
    'bg-red-ba1a1a text-white hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
  roundedBorder: 'rounded-full border border-gray-c2c6d6 py-2 px-6',
  roundedFill: 'rounded-full py-2 px-6',
};

const sizeClass: Record<Size, string> = {
  sm: 'px-3 py-1 text-xs leading-[16px] font-medium',
  md: 'px-4 py-3 text-xs leading-[16px] font-medium',
};

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const isRounded = variant === 'roundedBorder' || variant === 'roundedFill';
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-1 font-medium transition-all ${isRounded ? '' : 'rounded-md'} ${variantClass[variant]} ${isRounded ? '' : sizeClass[size]} ${className}`}
      {...props}
    />
  );
}
