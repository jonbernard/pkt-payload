import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[140px] md:pb-[120px] md:pt-[240px] xl:pb-[160px] xl:pt-[240px] 2xl:pb-[200px] 2xl:pt-[280px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="wow fadeInUp mx-auto max-w-[800px] text-center" data-wow-delay=".2s">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Making good men better... for over 100 years!
                </h1>
                <p className="dark:text-body-color-dark mb-6 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
                  Since 1923, Phi Chapter of Phi Kappa Tau has been a home for young men seeking brotherhood, leadership, and personal growth. Join us
                  on this journey as we continue to uphold the values that make our brotherhood truly special.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button variant="contained" className="hidden dark:block">
                    Learn more about Phi Chapter
                  </Button>
                  <Button variant="outlined" className="dark:hidden block bg-white">
                    Learn more about Phi Chapter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 lg:-top-[200px] z-[-1] opacity-10 dark:opacity-5 scale-50 lg:scale-100 origin-top-right">
          <Image src="/coa.png" alt="blob" width={800} height={800} />
        </div>
      </section>
    </>
  );
};

export default Hero;
