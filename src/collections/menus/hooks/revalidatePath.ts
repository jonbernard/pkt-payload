import { revalidatePath } from 'next/cache';

import type { CollectionAfterChangeHook } from 'payload';

import type { Menu } from '@payload-types';

export const revalidateCache: CollectionAfterChangeHook<Menu> = async ({ doc, previousDoc, req: { payload } }) => {
  const { docs: pages } = await payload.find({
    collection: 'pages',
    limit: 100,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  });
  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: 100,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
  });

  [...pages, ...posts]
    .filter((page) => page?.url && Boolean(page.slug))
    .forEach((page) => {
      if (page.url) {
        payload.logger.info(`Revalidating cache at path: ${page.url}`);

        revalidatePath(page.url);
      }
    });

  return doc;
};
