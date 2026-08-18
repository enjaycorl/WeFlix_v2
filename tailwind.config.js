/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        gray: {
          900: '#121212', // Darker gray for deep background
          800: '#1f1f1f', // Slightly lighter for surfaces
          700: '#2d2d2d', // For borders or hover states
          600: '#404040', // For secondary text or icons
        },
        // PirTV brand accent — warm orange
        brand: {
          DEFAULT: '#F5842A',
          300: '#FCB877',
          400: '#FB9E4B',
          500: '#F5842A',
          600: '#E5751C',
          700: '#C25F12',
          800: '#9C4C0E',
          900: '#7A3C0C',
          950: '#431F06',
        },
        // PirTV surface palette — deep plum / purple
        plum: {
          950: '#100a1a', // deepest background
          900: '#160e24', // app background
          850: '#1a1029',
          800: '#1e1433', // raised surface
          700: '#271a40', // cards
          600: '#33235a', // borders / hover
          500: '#4a3273',
        },
      },
      aspectRatio: {
        '16/7': '16 / 7', // Custom aspect ratio
        '2/3': '2 / 3', // Common for posters
        '3/2': '3 / 2',
      },
      screens: {
        'xs': '475px',    // Extra small screens
        'mobile': {'max': '767px'}, // Target mobile specifically (useful for overrides)
      },
      spacing: {
        // Adds padding for the notch/home bar area on iOS devices
        'safe-area-bottom': 'env(safe-area-inset-bottom, 1rem)', // Added a fallback value
      },
      // Add other customizations like fontFamily if needed
    },
  },
  plugins: [
    // Add the scrollbar plugin here
    require('tailwindcss-scrollbar'),
    // You might also want the forms plugin for better form styling
    // require('@tailwindcss/forms'),
    // Or the typography plugin for prose styling
    // require('@tailwindcss/typography'),
     // Or line-clamp for text truncation
    
  ],
}
