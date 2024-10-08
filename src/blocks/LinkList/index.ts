import type { Block } from 'payload';

export const LinkList: Block = {
  slug: 'linkList',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'large',
      options: [
        {
          label: 'Large list',
          value: 'large',
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'Url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
