/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#292e33',
        lighter: '#363b40',
        darker: '#1c2023',
        body: '#ced1d5',
        conversion: '#42929C',
        conversionHover: '#287090',
      },
      animation: {
        fill: 'fill forwards',
        border: 'border forwards',
      },
      keyframes: {
        border: {
          '0%': {
            'box-shadow':
              '60px -60px 0 2px #000, -60px -60px 0 2px #000, -60px 60px 0 2px #000, 60px 60px 0 2px #000, 0 0 0 2px #E94E3D',
          },
          '25%': {
            'box-shadow':
              '0 -125px 0 2px #000, -60px -60px 0 2px #000, -60px 60px 0 2px #000, 60px 60px 0 2px #000, 0 0 0 2px #fff',
          },
          '50%': {
            'box-shadow':
              '0 -125px 0 2px #000, -125px 0px 0 2px #000, -60px 60px 0 2px #000, 60px 60px 0 2px #000, 0 0 0 2px #fff',
          },
          '75%': {
            'box-shadow':
              '0 -125px 0 2px #000, -125px 0px 0 2px #000, 0px 125px 0 2px #000, 60px 60px 0 2px #000, 0 0 0 2px #fff',
          },
          '100%': {
            'box-shadow':
              '0 -125px 0 2px #000, -125px 0px 0 2px #000, 0px 125px 0 2px #000, 120px 40px 0 2px #000, 0 0 0 2px #fff',
          },
        },
      },
    },
  },
};
