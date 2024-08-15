'use client';

import { Jost } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import ScrollToTop from '@/app/components/ScrollToTop';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import 'node_modules/react-modal-video/css/modal-video.css';

import { Providers } from './providers';
import './styles/index.css';

const jost = Jost({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${jost.className}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Providers>
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
