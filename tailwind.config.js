/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#222222',
        blue: '#007FFF',
        red: '#DF3030',
        gray: {
          100: '#BDBDBD',
          200: '#EBEBEB',
          300: '#5E6278',
        },
        green: '#0FAC7E',
        orange: '#F68500',
        border: '#D4D4D4',
        yellow: '#FFC900'
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"]
      },
      boxShadow: {
        card: '0px 0px 6px rgba(51, 51, 51, 0.2)'
      },
      container: {
        center: true,
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px'
        },
        padding: {
          DEFAULT: '1rem',
          md: '1.5rem'
        }
      }
    },
  },
  plugins: [],
}