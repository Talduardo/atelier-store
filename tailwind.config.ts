import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0e0e0e',
        parchment: '#f5f0e8',
        copper: {
          DEFAULT: '#b5692a',
          light: '#d4843c',
          dark: '#8a4d1e',
        },
        ash: '#2a2a2a',
        smoke: '#6b6b6b',
        fog: '#d4cfc6',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
