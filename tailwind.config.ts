export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
        boxShadow: {
         'sp': '0 3px 0 12px rgba(0, 0, 0, 0.2)',
        },
        fontFamily: {
          sans: ['Avenir', 'sans-serif','Aerial', 'Helvetica'],
        },
        animation: {
          'fade-in': 'fade-in 0.5s ease-in-out',
          'fade-out': 'fade-out 0.5s ease-in-out',
        },
        keyframes: {
            yellowfade: {
                '0%': { backgroundColor: 'yellow' },
                '100%': { backgroundColor: 'transparent' },
            },
        }
    },
  },
  plugins: [],
}
