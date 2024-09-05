import { Button, Stack } from '@mui/material';
import CallToAction from './components/CallToAction';
import Hero from './components/Hero';
import News from './components/News';
import ScrollUp from './components/ScrollUp';
import { getPayload } from './utils';
import Link from 'next/link';

const Page = async () => {
  const payload = await getPayload();

  const data = await payload.find({
    collection: 'posts',
    limit: 3,
    overrideAccess: true,
    sort: '-updatedAt',
  });
  console.log('JB | Page | data:', data);

  return (
    <>
      <ScrollUp />
      <Hero />
      <CallToAction />
      <News posts={data.docs} />
      {data.hasNextPage && (
        <Stack alignItems="center" className="dark:bg-gray-dark bg-white text-center">
          <Button variant="contained" href="/news" LinkComponent={Link} className="hidden dark:block">
            More news
          </Button>
          <Button variant="outlined" href="/news" LinkComponent={Link} className="block dark:hidden">
            More news
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Page;
