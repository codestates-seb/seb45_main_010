const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
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
      },
      green: '#008774',
      koko: {
        1: '#FBE44D',
        2: '#E8D13B',
      },
      red: '#FC0707',
      grey: {
        1: '#D9D9D9',
        2: '#EEEEEE',
        3: '#CBCBCB',
      },
    },
  },
  plugins: [],
});
