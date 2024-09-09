import { isNumber } from 'lodash';

import { DataFromCollectionSlug } from 'payload';

import Hero from '@/components/hero';
import { SerializedLexicalNode } from '@/components/richText/types';
import ContentComponent from '@/components/richText';
import RelatedPosts from '@/components/relatedPosts';

type Props = DataFromCollectionSlug<'posts'> & {
  body?: SerializedLexicalNode[];
};

const Content = ({ authors, body, relatedLinks, title, updatedAt, createdAt }: Props) => {
  return (
    <main>
      <article>
        <Hero title={title} author={authors?.[0] && !isNumber(authors?.[0]) ? authors[0]?.name : undefined} date={updatedAt || createdAt} />

        <section id="content" className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-8">
          {body?.map((node, index) => (
            <ContentComponent key={index} data={node} />
          ))}
          {(relatedLinks || []).length > 0 && <RelatedPosts posts={relatedLinks} />}
        </section>
      </article>
    </main>
  );
};

export default Content;
