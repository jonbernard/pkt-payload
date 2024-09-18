import { DataFromCollectionSlug, PaginatedDocs } from 'payload';

import { Stack } from '@mui/material';

import News from '@/components/News';
import ScrollUp from '@/components/ScrollUp';
import Hero from '@/components/hero';
import { SerializedLexicalNode } from '@/components/richText/types';
import { Post } from '@payload-types';

import { renderPageBody } from './[pageSlug]/utils';
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

      {renderPageBody(body)}

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
