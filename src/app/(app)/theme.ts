'use client';
import { Jost } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });
const jost = Jost({ subsets: ['latin'] });

const theme = createTheme({
  typography: {
    fontFamily: jost.style.fontFamily,
  },
});

export default theme;
