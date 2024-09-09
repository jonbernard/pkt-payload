import type { CollectionAfterChangeHook } from 'payload';

import type { Post } from '@payload-types';

export const validateSlug: CollectionAfterChangeHook<Post> = async ({ doc, previousDoc, req: { payload } }) => {
  const { totalDocs } = await payload.find({
    collection: 'posts',
    depth: 0,
    overrideAccess: true,
    where: {
      slug: {
        equals: doc.slug,
      },
    },
  });

  if (totalDocs > 1) {
    doc.slug = `${doc.slug}-${totalDocs}`;
  }

  return doc;
};
