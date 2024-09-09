import { SerializedLexicalNode } from '@/components/richText/types';

import { getPayload } from './utils';
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
