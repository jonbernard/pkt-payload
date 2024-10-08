import { CollectionConfig } from 'payload';

import { admin } from '@/access/admin';
import { anyone } from '@/access/anyone';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'center',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'center',
      },
      {
        name: 'tablet',
        width: 800,
        height: undefined,
      },
      {
        name: 'desktop',
        width: 1440,
        height: undefined,
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
};
