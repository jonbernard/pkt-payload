import React from 'react';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { notFound } from 'next/navigation';

import { getPayload } from '../../../utils';
import Client from './client';

type Props = {
  params: {
    collection: CollectionSlug;
    slug: string;
  };
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const getPost = async (params: Props['params']) => {
  const payload = await getPayload();

  const data = await payload.find({
    collection: params.collection,
    limit: 10,
    overrideAccess: true,
    draft: true,
    where: {
      slug: {
        equals: params.slug,
      },
    },
  });

  return data.docs[0] as DataFromCollectionSlug<'posts' | 'pages'>;
};

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

  const payload = await getPayload();

  const news = await payload.find({
    collection: 'posts',
    limit: 3,
    overrideAccess: true,
    sort: '-updatedAt',
  });

  return <Client collection={params.collection} page={page} news={news} />;
};

export default Page;
