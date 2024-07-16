import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
};
