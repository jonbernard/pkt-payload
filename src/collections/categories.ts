import type { CollectionConfig } from 'payload';

import { admin } from '@/access/admin';
import { anyone } from '@/access/anyone';

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
};
