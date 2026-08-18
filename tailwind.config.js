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
        // PirTV brand palette — deep plum-black canvas + warm amber accent
        ink: {
          DEFAULT: '#0B0710', // app background
          soft: '#140C1E',    // raised surface
          line: '#241A33',    // hairline borders
        },
        amber: {
          400: '#FFA95C',
          500: '#F5913A', // primary accent (CTA, active nav, progress)
          600: '#E07A22',
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
