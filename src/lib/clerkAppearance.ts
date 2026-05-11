import type { Appearance } from '@clerk/types';

export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: '#0D9488',
    colorText: '#191C1E',
    colorTextSecondary: '#45464D',
    colorBackground: '#FFFFFF',
    colorInputBackground: '#FFFFFF',
    colorInputText: '#191C1E',
    colorDanger: '#BA1A1A',
    borderRadius: '12px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
  },
  elements: {
    rootBox: 'w-full',
    cardBox:
      'shadow-none border border-gray-cfcfcf rounded-[16px] bg-white w-full',
    card: 'shadow-none bg-white',
    headerTitle: 'text-black-191c1e text-2xl font-semibold',
    headerSubtitle: 'text-black-45464d',
    socialButtonsBlockButton:
      'border border-gray-c2c6d6 rounded-[12px] hover:bg-gray-eceef0 normal-case',
    socialButtonsBlockButtonText: 'text-black-191c1e font-medium',
    dividerLine: 'bg-gray-c2c6d6',
    dividerText: 'text-black-45464d text-xs uppercase tracking-wide',
    formFieldLabel: 'text-black-191c1e text-sm font-medium',
    formFieldInput:
      'border border-gray-c2c6d6 rounded-[12px] focus:border-green-0d9488 focus:ring-0',
    formButtonPrimary:
      'bg-green-0d9488 hover:bg-green-006a61 normal-case font-semibold text-white shadow-none',
    formButtonReset:
      'text-black-45464d hover:text-black-191c1e normal-case font-medium',
    formResendCodeLink: 'text-green-0d9488 hover:text-green-006a61 font-medium',
    formFieldErrorText: 'text-red-ba1a1a text-xs',
    alert: 'rounded-[12px]',
    alertText: 'text-red-ba1a1a',
    identityPreviewEditButton: 'text-green-0d9488 hover:text-green-006a61',
    footerActionText: 'text-black-45464d',
    footerActionLink:
      'text-green-0d9488 hover:text-green-006a61 font-semibold',
    footer: 'bg-white',
    userButtonPopoverCard:
      'shadow-[0_10px_30px_rgb(0_0_0/0.08)] rounded-[16px] border border-gray-cfcfcf',
    userButtonPopoverActionButton:
      'text-black-191c1e hover:bg-gray-eceef0 rounded-[8px]',
    userButtonPopoverActionButtonText: 'text-black-191c1e',
    userButtonPopoverFooter: 'hidden',
  },
};
