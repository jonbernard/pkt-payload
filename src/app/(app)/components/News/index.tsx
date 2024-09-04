import { Container } from '@mui/material';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

const News = async () => {
  const payload = await getPayloadHMR({
    config,
  });

  const data = await payload.find({
    collection: 'posts',
    limit: 6,
    overrideAccess: true,
  });

  console.log(data.docs);

  return (
    <section id="news" className="dark:bg-gray-dark bg-white">
      <Container maxWidth="lg" className="py-12">
        <div className="wow fadeInUp mx-auto max-w-[800px]" data-wow-delay=".2s">
          <h1 className="mb-5 text-md font-bold text-center leading-tight text-black dark:text-white sm:text-lg sm:leading-tight md:text-3xl md:leading-tight">
            News and Happenings
          </h1>
        </div>
      </Container>
    </section>
  );
};

export default News;
