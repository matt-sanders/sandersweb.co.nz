import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'

const toRem = (px: number): string => {
  return `${px / 16}rem`
}

const spacings = [2, 4, 6, 8, 12, 16, 18, 24, 48, 72, 124]
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    borderRadius: {
      DEFAULT: '9px',
    },
    colors: {
      black: '#000',
      dark: {
        900: '#000',
      },
      light: {
        900: '#fff',
      },
      primary: {
        900: '#734B5E',
      },
      secondary: {
        900: '#E8F6B6',
      },
      project: {
        nota: '#67BBBC',
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      base: toRem(1),
      'heading-900': [
        'clamp(2.875rem, -0.4728rem + 16.7391vw, 12.5rem)',
        {
          fontWeight: 900,
          lineHeight: '1',
        },
      ],
      //'heading-800': [],
      'heading-700': [
        'clamp(1.9963rem, -0.092rem + 10.4413vw, 8rem)',
        {
          fontWeight: 900,
          lineHeight: '1',
        },
      ],
      'heading-500': [
        toRem(24),
        {
          fontWeight: 900,
          lineHeight: '1',
        },
      ],
      700: [
        toRem(24),
        {
          fontWeight: 600,
        },
      ],
    },
    spacing: {
      0: '0px',
      full: '100%',
      'site-gutter': toRem(24),
      'shadow-offset': toRem(6),
      ...Object.fromEntries(spacings.map((px) => [`${px}px`, toRem(px)])),
    },
    textShadow: {
      DEFAULT: `-${toRem(6)} ${toRem(6)} var(--tw-shadow-color)`,
    },
    extend: {
      transitionTimingFunction: {
        bounce: 'cubic-bezier(.34,2.06,.21,.48)',
      },
    },
  },
  plugins: [
    typography,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
  ],
}
export default config
