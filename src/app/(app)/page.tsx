import { Stack } from '@mui/material';
import { SerializedLexicalNode } from '@/components/richText/types';

import CallToAction from '@/components/CallToAction';
import Hero from '@/components/hero';
import News from '@/components/News';
import ScrollUp from '@/components/ScrollUp';

import { getPayload } from './utils';
import LinkButton from './components/linkButton';
import Content from './content';

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

  return <Content {...home} body={content} news={data} />;
};

export default Page;
