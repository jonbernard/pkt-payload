// import { Button } from '@mui/material';
import { Container, Stack } from '@mui/material';
import { DateTime } from 'luxon';
import Image from 'next/image';

type Props = {
  title: string;
  author?: string | null;
  date?: string;
  links?: (
    | {
        title: string;
        url: string;
      }
    | undefined
  )[];
};

const HeroTitle = ({ author, date, links, title }: Props) => {
  return (
    <section className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[160px] md:pb-[120px] md:pt-[200px] xl:pb-[140px] xl:pt-[220px] 2xl:pb-[180px] 2xl:pt-[240px]">
      <Container maxWidth="lg">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="wow fadeInUp mx-auto max-w-[800px] text-center" data-wow-delay=".2s">
              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                {title}
              </h1>
              {links && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={3}
                  className="dark:text-body-color-dark mb-6 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl"
                >
                  {links.map((link) => (
                    <a key={link?.url || ''} href={`/${link?.url}`} className="border-current border-dotted border-b decoration-none">
                      {link?.title}
                    </a>
                  ))}
                  {links.map((link) => (
                    <a key={link?.url || ''} href={`/${link?.url}`} className="border-current border-dotted border-b decoration-none">
                      {link?.title}
                    </a>
                  ))}
                </Stack>
              )}
              {(author || date) && (
                <p className="dark:text-body-color-dark mb-6 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
                  {author && <span>{author} | </span>}
                  {date && <span>{DateTime.fromISO(date).toFormat('LLLL dd, yyyy')}</span>}
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
      <div className="absolute right-0 top-0 lg:-top-[200px] z-[-1] opacity-10 dark:opacity-5 scale-50 lg:scale-100 origin-top-right">
        <Image src="/coa.png" alt="blob" width={800} height={800} className="animate-in fade-in duration-700" />
      </div>
    </section>
  );
};

export default HeroTitle;
