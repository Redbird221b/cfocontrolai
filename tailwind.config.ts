import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#071321',
        surface: '#101E2E',
        ink: '#142033',
        muted: '#64748B',
        paper: '#F5F7FA',
        emerald: '#16C784',
        cyan: '#22B8CF',
        amber: '#F59E0B',
        danger: '#D14343',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        fintech: '0 14px 34px rgba(7, 19, 33, 0.14)',
        panel: '0 10px 24px rgba(7, 19, 33, 0.10)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(34, 184, 207, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 184, 207, 0.12) 1px, transparent 1px)',
      },
    },
  },
  plugins: [forms],
}

export default config
