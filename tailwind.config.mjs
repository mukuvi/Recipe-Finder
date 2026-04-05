import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-display)', 'var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
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
};

export default config;
