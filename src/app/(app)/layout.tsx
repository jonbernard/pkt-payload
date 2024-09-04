import type { Metadata } from 'next';
import { Jost } from 'next/font/google';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

import Footer from '@app/components/Footer';
import Header from '@app/components/Header';

import 'node_modules/react-modal-video/css/modal-video.css';

import { Providers } from './providers';
import './styles/index.css';

const jost = Jost({ subsets: ['latin'] });

const defaultTitle = 'Phi Chapter of the Phi Kappa Tau Fraternity';

export const metadata: Metadata = {
  metadataBase: new URL('https://pktphichapter.org'),
  title: {
    default: defaultTitle,
    template: `%s | ${defaultTitle}`,
  },
  description:
    "Phi Chapter has a long and proud history of enhancing the education of the young men of Bethany College in Bethany, West Virginia, with the unique experience that only a fraternity with 'a mark of distinction' can provide.",
  // icons: {
  //   icon: '/images/logo.png',
  // },
  openGraph: {
    title: {
      default: defaultTitle,
      template: `%s | ${defaultTitle}`,
    },
    type: 'website',
    locale: 'en_US',
    url: 'https://pktphichapter.org',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${jost.className}`}>
        <NextThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
          <Providers>
            <Header />
            {children}
            <Footer />
            {/* <ScrollToTop /> */}
          </Providers>
        </NextThemeProvider>
      </body>
    </html>
  );
}
