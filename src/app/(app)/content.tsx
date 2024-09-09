import { DataFromCollectionSlug, PaginatedDocs } from 'payload';
import { Post } from '@payload-types';

import { Stack } from '@mui/material';
import { SerializedLexicalNode } from '@/components/richText/types';
import ContentComponent from '@/components/richText';

import CallToAction from '@/components/CallToAction';
import Hero from '@/components/hero';
import News from '@/components/News';
import ScrollUp from '@/components/ScrollUp';

import LinkButton from './components/linkButton';

type Props = DataFromCollectionSlug<'pages'> & {
  body?: SerializedLexicalNode[];
  news?: PaginatedDocs<Post>;
};

const Content = ({ body, description, news, relatedLinks, title }: Props) => {
  return (
    <>
      <ScrollUp />

      <Hero title={title} description={description!} related={relatedLinks} />

      <CallToAction />

      {body && (body.length > 1 || (body[0]?.children?.length || 0) > 0) && (
        <section id="content" className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-8">
          {body?.map((node, index) => (
            <ContentComponent key={index} data={node} />
          ))}
        </section>
      )}

      {news?.docs && news.docs.length > 0 && (
        <>
          <News posts={news?.docs} />

          {news?.hasNextPage && (
            <Stack alignItems="center" className="dark:bg-gray-dark bg-white text-center">
              <LinkButton type="custom" url="/news" label="More news" />
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default Content;
