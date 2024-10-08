import CallToAction from './components/CallToAction';
import News from './components/News';
import ScrollUp from './components/ScrollUp';
import Hero from './components/hero';
import { getPayload } from './utils';

export default async function NotFound() {
  const payload = await getPayload();

  const data = await payload.find({
    collection: 'posts',
    limit: 3,
    overrideAccess: true,
    sort: '-updatedAt',
  });

  return (
    <>
      <ScrollUp />
      <Hero title="Could not find this page" />
      <CallToAction />
      <News posts={data.docs} />
    </>
  );
}
