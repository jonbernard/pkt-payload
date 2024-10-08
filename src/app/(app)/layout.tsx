import type { Metadata } from 'next';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { Jost } from 'next/font/google';
import Script from 'next/script';

import Footer from '@app/components/Footer';
import Header from '@app/components/Header';

import { Providers } from './providers';
import './styles/index.css';
import { getPayload } from './utils';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload();

  const headerMenu = await payload.find({
    collection: 'menus',
    overrideAccess: true,
    limit: 1,
    depth: 1,
    where: {
      slug: {
        equals: 'header',
      },
    },
  });

  const footerMenu = await payload.find({
    collection: 'menus',
    overrideAccess: true,
    depth: 1,
    limit: 2,
    where: {
      slug: {
        contains: 'footer',
      },
    },
    sort: 'slug',
  });

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
            <Header menu={headerMenu.docs[0]} />
            {children}
            <Footer menus={footerMenu.docs} />
            {/* <ScrollToTop /> */}
          </Providers>
        </NextThemeProvider>
        <Script async src="https://js.stripe.com/v3/buy-button.js" />
        <div id="fb-root"></div>
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v21.0&appId=193476223998315"
        />
      </body>
    </html>
  );
}
