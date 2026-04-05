import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          main: 'var(--bg-main)',
          secondary: 'var(--bg-secondary)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          hover: 'var(--secondary-hover)',
        },
        accent: 'var(--accent)',
        text: {
          main: 'var(--text-main)',
          muted: 'var(--text-muted)',
        },
        border: 'var(--border)',
      },
    },
  },
  plugins: [typography],
} satisfies Config;
