import React, { cache } from 'react';
import { isNumber } from 'lodash';
import { notFound } from 'next/navigation';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

import Hero from './components/Hero';
import { SerializedLexicalNode } from './components/richText/types';
import Content from './components/richText';
import RelatedPosts from './components/relatedPosts';

type Props = {
  params: {
    slug: string;
  };
};

const getPost = cache(async (params: { slug: string }) => {
  const payload = await getPayloadHMR({
    config,
  });

  const data = await payload.find({
    collection: 'posts',
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: params.slug,
      },
    },
  });

  return data.docs[0];
});

export async function generateMetadata({ params }: Props) {
  const page = await getPost(params);
  return {
    title: page.title,
  };
}

const Page = async ({ params }: Props) => {
  const page = await getPost(params);

  console.log('JB | Page | page:', page);
  if (!page) return notFound();

  const content = page.content?.root?.children as SerializedLexicalNode[];

  return (
    <main>
      <article>
        <Hero
          title={page.title}
          author={page.authors?.[0] && !isNumber(page.authors?.[0]) ? page.authors[0]?.name : undefined}
          date={page.updatedAt || page.createdAt}
        />

        <section id="content" className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-8">
          {content?.map((node, index) => (
            <Content key={index} data={node} />
          ))}
          {(page.relatedPosts || []).length > 0 && <RelatedPosts posts={page.relatedPosts} />}
        </section>
      </article>
    </main>
  );
};

export default Page;
