import { DateTime } from 'luxon';
import Image from 'next/image';

import { LinkAppearances } from '@/fields/headerLink';
import { Container, Stack } from '@mui/material';
import { Page, Post } from '@payload-types';

import Link from './link';
import LinkButton from './linkButton';

type Props = {
  title: string;
  description?: string;
  author?: string | null;
  date?: string;
  related?: Page['relatedLinks'] | Post['relatedLinks'];
  linkStyle?: LinkAppearances;
};

const Hero = (props: Props) => {
  const { author, linkStyle = 'button', date, description, related, title } = props;

  return (
    <>
      <section
        id="home"
        className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[140px] md:pb-[120px] md:pt-[240px] xl:pb-[160px] xl:pt-[240px] 2xl:pb-[200px] 2xl:pt-[280px]"
      >
        <Container maxWidth="lg">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  {title}
                </h1>
                {(author || date) && (
                  <p className="dark:text-body-color-dark mb-6 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
                    {author && <span>{author} | </span>}
                    {date && <span>{DateTime.fromISO(date).toFormat('LLLL dd, yyyy')}</span>}
                  </p>
                )}
                {description && (
                  <p className="dark:text-body-color-dark mb-6 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">{description}</p>
                )}
                {related && (
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={3}>
                    {related.map((link) =>
                      linkStyle === 'button' ? <LinkButton key={link?.id || ''} {...link} /> : <Link key={link?.id || ''} {...link} />,
                    )}
                  </Stack>
                )}
              </div>
            </div>
          </div>
        </Container>
        <div className="absolute right-0 top-0 lg:-top-[200px] z-[-1] opacity-10 dark:opacity-10 scale-50 lg:scale-100 origin-top-right">
          <Image src="/coa.png" alt="coa" width={800} height={800} className="animate-fadeIn" />
        </div>
      </section>
    </>
  );
};

export default Hero;
