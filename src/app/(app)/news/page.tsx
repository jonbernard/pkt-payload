import HeroTitle from '../components/heroTitle';
import News from '../components/News';
import Pagination from '../components/pagination';
import { getPayload } from '../utils';

const Page = async () => {
  const payload = await getPayload();

  const data = await payload.find({
    collection: 'posts',
    limit: 12,
    page: 0,
    depth: 1,
    overrideAccess: true,
    sort: '-updatedAt',
  });

  return (
    <>
      <HeroTitle title="News and Happenings" />
      <News posts={data.docs} title={false} />
      <Pagination count={data.totalPages} page={1} createUrl="/news/page/${page}" />
    </>
  );
};

export default Page;
