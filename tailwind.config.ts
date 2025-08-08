import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'patua-one': ['Patua One', 'cursive'],
      },
      colors: {
        'key-default': '#818384',
        'miss': '#3a3a3c',
        'hit': '#b59f3b',
        'perfect': '#538d4e',
        'wordle-bg': '#121213',
      },
    },
  },
  plugins: [],
}
export default config
