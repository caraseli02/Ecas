/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
        './utils/**/*.{js,ts,html}',
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
            animation: {
                'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1) 1',
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
    safelist: [
        'grid-cols-[359px,154px,254px,244px,129px,148px,104px]',
        'grid-cols-[154px,359px,254px,244px,129px,148px,104px]',
        'grid-cols-[212px,212px,256px,256px,232px,224px]',
        'grid-cols-[50px,191px,191px,191px,191px,191px,191px,minmax(196px,1fr)',
        'grid-cols-[158px,149px,228px,275px,141px,220px,136px,85px]',
        'grid-cols-[50px,191px,191px,191px,191px,228px,191px,minmax(196px,1fr)',
    ]
};
