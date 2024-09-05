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
    title: page?.title,
  };
}

const Page = async ({ params }: Props) => {
  const page = await getPost(params);

  if (!page) return notFound();

  return <Client collection={params.collection} page={page} />;
};

export default Page;
