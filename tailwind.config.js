/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
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
                yellow: '#FFC900',
            },
            fontFamily: {
                Inter: ['Inter', 'sans-serif'],
                Poppins: ['Poppins', 'sans-serif'],
            },
            boxShadow: {

                xs: '0px 0px 8px rgba(133, 133, 133, 0.25)',
                s: '0px 0px 8px rgba(133, 133, 133, 0.25)',
                m: '0px 0px 16px rgba(133, 133, 133, 0.25)',
                l: '0px 0px 24px rgba(133, 133, 133, 0.25)',
                xl: '0px 0px 32px rgba(133, 133, 133, 0.25)',
                xxl: '0px 0px 48px rgba(133, 133, 133, 0.25)',
            },
            container: {
                center: true,
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1440px',
                },
                padding: {
                    DEFAULT: '1rem',
                    md: '1.5rem',
                },
            },
        },
    },
    plugins: [],
};