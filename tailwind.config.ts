import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Material 3 / Vitality Editorial System Colors
        primary: '#006e1c',
        'primary-container': '#4baf4f',
        'on-primary': '#ffffff',
        'on-primary-container': '#003c0b',
        'primary-fixed': '#93fa8f',
        'primary-fixed-dim': '#77dc76',
        'on-primary-fixed': '#002204',
        'on-primary-fixed-variant': '#005313',

        secondary: '#1b6d24',
        'secondary-container': '#a0f399',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#217128',
        'secondary-fixed': '#a3f69c',
        'secondary-fixed-dim': '#88d982',
        'on-secondary-fixed': '#002204',
        'on-secondary-fixed-variant': '#005312',

        tertiary: '#556158',
        'tertiary-container': '#929e94',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#2a352d',
        'tertiary-fixed': '#d9e6da',
        'tertiary-fixed-dim': '#bdcabe',
        'on-tertiary-fixed': '#131e17',
        'on-tertiary-fixed-variant': '#3e4a41',

        error: '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',

        background: '#fcf9f8',
        'on-background': '#1c1b1b',

        surface: '#fcf9f8',
        'surface-dim': '#dcd9d9',
        'surface-bright': '#fcf9f8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3f2',
        'surface-container': '#f0eded',
        'surface-container-high': '#eae7e7',
        'surface-container-highest': '#e5e2e1',
        'on-surface': '#1c1b1b',
        'on-surface-variant': '#3f4a3c',

        outline: '#6f7a6b',
        'outline-variant': '#becab8',

        'surface-tint': '#006e1c',
        'inverse-surface': '#313030',
        'inverse-on-surface': '#f3f0ef',
        'inverse-primary': '#77dc76',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg-mobile': ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-md': ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
      spacing: {
        unit: '8px',
        'section-gap': '80px',
        'margin-mobile': '20px',
        gutter: '24px',
        'container-max': '1200px',
      },
      boxShadow: {
        premium: '0 4px 20px rgba(0, 0, 0, 0.04)',
        'premium-lg': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'premium-hover': '0 12px 40px rgba(0, 0, 0, 0.08)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
        fast: '150ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
        'in-out': 'ease-in-out',
      },
      maxWidth: {
        'container-max': '1200px',
        'content-max': '720px',
        'prose-max': '720px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '20px',
          md: '24px',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      const newUtilities = {
        '.font-display-lg': {
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '48px',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
        },
        '.font-display-lg-mobile': {
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '36px',
          fontWeight: '700',
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
        },
        '.font-headline-md': {
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '32px',
          fontWeight: '600',
          lineHeight: '1.3',
          letterSpacing: '-0.01em',
        },
        '.font-headline-sm': {
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '1.4',
        },
        '.font-body-lg': {
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          lineHeight: '1.7',
        },
        '.font-body-md': {
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.6',
        },
        '.font-label-caps': {
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '12px',
          fontWeight: '600',
          lineHeight: '1.2',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;