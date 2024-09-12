'use client';

import { Jost } from 'next/font/google';

import { ThemeOptions, createTheme } from '@mui/material/styles';

export enum colors {
  Red = '#A6192E',
  Yellow = '#F2A900',
  Gray = '#5B6770',
  RedHighlight = '#D50032',
}

const jost = Jost({ subsets: ['latin'] });

const sharedConfig = {
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
  typography: {
    fontFamily: jost.style.fontFamily,
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
      opacity: 0.5,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
};

export const lightTheme = createTheme({
  ...(sharedConfig as Partial<ThemeOptions>),
  palette: {
    mode: 'light',
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
});

export const darkTheme = createTheme({
  ...(sharedConfig as Partial<ThemeOptions>),
  palette: {
    mode: 'dark',
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
});
