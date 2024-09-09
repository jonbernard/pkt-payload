import type { CollectionAfterChangeHook } from 'payload';

import { revalidatePath } from 'next/cache';

import type { Post } from '@payload-types';
import _ from 'lodash';

export const revalidateCache: CollectionAfterChangeHook<Post> = async ({ doc, previousDoc, req: { payload } }) => {
  revalidatePath('/');
  revalidatePath('/news');

  if (doc._status === 'published') {
    const path = `/news/${doc.slug}`;

    payload.logger.info(`Revalidating post at path: ${path}`);

    revalidatePath(path);
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/news/${previousDoc.slug}`;

    payload.logger.info(`Revalidating old post at path: ${oldPath}`);

    revalidatePath(oldPath);
  }

  const { totalPages } = await payload.find({
    collection: 'posts',
    limit: 12,
    depth: 0,
    overrideAccess: true,
    sort: '-updatedAt',
  });

  _.range(1, totalPages + 1).forEach((page) => {
    revalidatePath(`/news/page/${page}`);
  });

  return doc;
};
