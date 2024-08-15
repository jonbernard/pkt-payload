import { Button, Stack } from '@mui/material';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section id="home" className="dark:bg-gray-800 relative bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700">
      <div className="container">
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={6}
          direction="row"
          className="wow fadeInUp mx-auto max-w-[800px] text-center"
          data-wow-delay=".2s"
        >
          <h1 className="text-sm font-bold leading-tight text-black dark:text-white sm:text-md sm:leading-tight md:text-xl md:leading-tight">
            Support Phi Chapter grow with the Second Century Fund
          </h1>
          <Button variant="contained">Donate</Button>
        </Stack>
      </div>
    </section>
  );
};

export default CallToAction;
