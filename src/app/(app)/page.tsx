import Link from 'next/link';

import { Button, Stack } from '@mui/material';
import { SerializedLexicalNode } from '@/components/richText/types';
import Content from '@/components/richText';

import CallToAction from '@/components/CallToAction';
import Hero from '@/components/hero';
import News from '@/components/News';
import ScrollUp from '@/components/ScrollUp';

import { getPayload } from './utils';
import LinkButton from './components/linkButton';

const Page = async () => {
  const payload = await getPayload();

  const {
    docs: [home],
  } = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: 'home',
      },
      _status: {
        equals: 'published',
      },
    },
  });

  const data = await payload.find({
    collection: 'posts',
    limit: 3,
    overrideAccess: true,
    sort: '-updatedAt',
  });

  const content = home?.content?.root?.children as SerializedLexicalNode[];

  return (
    <>
      <ScrollUp />

      <Hero title={home?.title} description={home?.description!} related={home?.relatedLinks} />

      <CallToAction />

      {content && (content.length > 1 || (content[0]?.children?.length || 0) > 0) && (
        <section id="content" className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-8">
          {content?.map((node, index) => (
            <Content key={index} data={node} />
          ))}
        </section>
      )}

      <News posts={data.docs} />

      {data.hasNextPage && (
        <Stack alignItems="center" className="dark:bg-gray-dark bg-white text-center">
          <LinkButton type="custom" url="/news" label="More news" />
        </Stack>
      )}
    </>
  );
};

export default Page;
