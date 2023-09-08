const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nanum Gothic', 'sans-serif'],
        serif: ['Nanum Gothic', 'sans-serif'],
        mono: ['Nanum Gothic', 'sans-serif'],
      },
      fontSize: {
        xxs: '8px',
        xs: '12px',
        sm: '14px',
        base: '16px',
        xl: '24px',
        '2xl': '36px',
      },
      colors: {
        mint: {
          1: '#E6F6F4',
          2: '#E0EFF8',
          3: '#F2FAFF',
          4: '#E4ECF1',
        },
        blue: {
          1: '#2E93D1',
          2: '#2984BC',
          3: '#BEDEF1',
        },
        green: '#008774',
        kaka: {
          1: '#FEE500',
          2: '#E8D13B',
        },
        red: '#FC0707',
        gray: {
          1: '#D9D9D9',
          2: '#EEEEEE',
          3: '#CBCBCB',
        },
      },
    },
  },
  plugins: [],
});
