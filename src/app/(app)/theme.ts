'use client';
import { Jost } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export enum colors {
  Red = '#A6192E',
  Yellow = '#F2A900',
  Gray = '#5B6770',
  RedHighlight = '#D50032',
}

const jost = Jost({ subsets: ['latin'] });

const theme = createTheme({
  typography: {
    fontFamily: jost.style.fontFamily,
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: colors.Red,
      contrastText: '#fff',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: colors.Yellow,
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          textTransform: 'none',
          padding: '0.5rem 1.5rem',
        },
      },
    },
  },
});

export default theme;
