import { Jost } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import Footer from '@app/components/Footer';
import Header from '@app/components/Header';
import ScrollToTop from '@app/components/ScrollToTop';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import 'node_modules/react-modal-video/css/modal-video.css';

import { Providers } from './providers';
import './styles/index.css';
import type { Metadata } from 'next';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Phi Chapter of the Phi Kappa Tau Fraternity',
  description:
    "Phi Chapter has a long and proud history of enhancing the education of the young men of Bethany College in Bethany, West Virginia, with the unique experience that only a fraternity with 'a mark of distinction' can provide.",
  // other metadata
};

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
              {/* <ScrollToTop /> */}
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
