import Hero from '@/components/hero';
import { SerializedLexicalNode } from '@/components/richText/types';

import { renderPageBody } from '../[pageSlug]/utils';
import News from '../components/News';
import Pagination from '../components/pagination';
import { getPayload } from '../utils';

const Page = async () => {
  const payload = await getPayload();

  const {
    docs: [news],
  } = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: 'news',
      },
      _status: {
        equals: 'published',
      },
    },
  });

  const data = await payload.find({
    collection: 'posts',
    limit: 12,
    page: 0,
    depth: 1,
    overrideAccess: true,
    sort: '-updatedAt',
  });

  const content = news?.content?.root?.children as SerializedLexicalNode[];

  return (
    <>
      <Hero title="News and Happenings" />
      <News posts={data.docs} title={false} />
      <Pagination
        count={data.totalPages}
        page={1}
        createUrl="/news/page/${page}"
        className={content?.length > 0 ? 'pb-6' : ''}
      />
      {renderPageBody(content)}
    </>
  );
};

export default Page;
