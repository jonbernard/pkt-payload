import React, { cache } from 'react';
import { notFound } from 'next/navigation';

import { SerializedLexicalNode } from '@/components/richText/types';
import { getPayload } from '../../utils';
import Content from './content';

type Props = {
  params: {
    slug: string;
  };
};

const getPost = cache(async (params: { slug: string }) => {
  const payload = await getPayload();

  const data = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: params.slug,
      },
      _status: {
        equals: 'published',
      },
    },
  });

  return data.docs[0];
});

export async function generateMetadata({ params }: Props) {
  const page = await getPost(params);

  return {
    title: page?.metaTitle || page?.title,
    description: page?.metaDescription,
    openGraph: {
      title: page?.metaTitle || page?.title,
      description: page?.metaDescription,
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}${page?.url}`,
    },
  };
}

const Page = async ({ params }: Props) => {
  const page = await getPost(params);

  if (!page) return notFound();

  const content = page.content?.root?.children as SerializedLexicalNode[];

  return <Content {...page} body={content} />;
};

export default Page;
