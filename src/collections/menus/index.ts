import type { CollectionConfig } from 'payload';

import { anyone } from '../../access/anyone';
import { admin } from '@/access/admin';
import { slugField } from '@/fields/slug';
import { linkFields } from '@/fields/headerLink';
import { revalidateCache } from './hooks/revalidatePath';

export const Menus: CollectionConfig = {
  slug: 'menus',
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      type: 'row',
      fields: [
        slugField(undefined, undefined, { admin: undefined }),
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu items',
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      fields: [
        ...linkFields,
        {
          name: 'submenu',
          type: 'array',
          label: 'Sub-menu',
          labels: {
            singular: 'Item',
            plural: 'Items',
          },
          fields: linkFields,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCache],
  },
};