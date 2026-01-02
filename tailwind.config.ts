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
        // Dive bar palette
        'beer-gold': '#F4A020',
        'beer-amber': '#D4820E',
        'beer-dark': '#8B5A00',
        'neon-red': '#FF3B3B',
        'neon-blue': '#00D4FF',
        'bar-black': '#0A0A0A',
        'bar-dark': '#141414',
        'bar-gray': '#1E1E1E',
        'smoke': '#2A2A2A',
        'cream': '#F5F0E6',
      },
      fontFamily: {
        'display': ['var(--font-display)', 'serif'],
        'body': ['var(--font-body)', 'sans-serif'],
        'mono': ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grain': "url('/noise.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'flicker': 'flicker 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pour': 'pour 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '52%': { opacity: '1' },
          '54%': { opacity: '0.9' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 2px currentColor)' },
          '100%': { filter: 'drop-shadow(0 0 8px currentColor) drop-shadow(0 0 20px currentColor)' },
        },
        pour: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
