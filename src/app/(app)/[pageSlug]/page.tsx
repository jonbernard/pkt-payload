import React, { cache } from 'react';
import { notFound } from 'next/navigation';

import Hero from '@/components/hero';
import { SerializedLexicalNode } from '@/components/richText/types';
import Content from '@/components/richText';

import { getPayload } from '../utils';

type Props = {
  params: {
    pageSlug: string;
  };
};

const getPost = cache(async (params: { pageSlug: string }) => {
  const payload = await getPayload();

  const data = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: params.pageSlug,
      },
    },
  });

  return data.docs[0];
});

export async function generateMetadata({ params }: Props) {
  const page = await getPost(params);

  return {
    title: page?.title,
  };
}

const Page = async ({ params }: Props) => {
  const page = await getPost(params);

  if (!page) return notFound();

  const content = page.content?.root?.children as SerializedLexicalNode[];

  return (
    <main>
      <article>
        <Hero title={page.title} related={page.relatedLinks} linkStyle="link" />

        <section id="content" className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-8">
          {content?.map((node, index) => (
            <Content key={index} data={node} />
          ))}
        </section>
      </article>
    </main>
  );
};

export default Page;
