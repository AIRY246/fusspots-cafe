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
        background: '#F7F5F2',
        'text-primary': '#222222',
        'text-secondary': '#666666',
        'brand-green': '#4A6A52',
        'brand-green-hover': '#35503D',
        'brand-brown': '#B88A44',
        'brand-border': '#EAEAEA',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
      boxShadow: {
        card: '0 2px 20px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}

export default config
