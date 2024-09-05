import { redirect } from 'next/navigation';
import HeroTitle from '../../../components/heroTitle';
import News from '../../../components/News';
import Pagination from '../../../components/pagination';
import { getPayload } from '../../../utils';

const Page = async ({ params: { pageNumber } }: { params: { pageNumber: string } }) => {
  if (pageNumber === '1') {
    redirect('/news');
  }
  const page = parseInt(pageNumber, 10);
  const payload = await getPayload();

  const data = await payload.find({
    collection: 'posts',
    limit: 12,
    page,
    depth: 1,
    overrideAccess: true,
    sort: '-updatedAt',
  });

  return (
    <>
      <HeroTitle title="News and Happenings" />
      <News posts={data.docs} title={false} />
      <Pagination count={data.totalPages} page={page} createUrl="/news/page/${page}" />
    </>
  );
};

export default Page;
