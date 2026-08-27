/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          base: '#FFF9F1',
          card: '#FDF6EC',
          border: '#EADFCF',
          darker: '#F5ECE0',
        },
        skyblue: {
          from: '#4A8DE8',
          via: '#68A3ED',
          to: '#94C0F6',
        },
        ink: {
          900: '#141416',
          800: '#1E1E24',
          700: '#2C2C34',
          600: '#52525E',
          500: '#7A7A88',
        },
        brand: {
          blue: '#3456C8',
          indigo: '#4361EE',
          gold: '#F4D24A',
          amber: '#F59E0B',
          sun: '#FBBF24',
          coral: '#FF6B4A',
        }
      },
      fontFamily: {
        serif: ['"DM Serif Display"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'recorder': '0 12px 24px -4px rgba(0,0,0,0.2), inset 0 2px 4px 0 rgba(255,255,255,0.7), inset 0 -3px 4px 0 rgba(0,0,0,0.15)',
        'polaroid': '0 14px 28px -6px rgba(0,0,0,0.08), 0 8px 12px -4px rgba(0,0,0,0.04)',
        'polaroid-hover': '0 24px 40px -8px rgba(0,0,0,0.14), 0 12px 18px -4px rgba(0,0,0,0.08)',
        'card-glass': '0 10px 30px -5px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}
