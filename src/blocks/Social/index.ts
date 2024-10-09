import type { Block } from 'payload';

export const Social: Block = {
  slug: 'social',
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        // {
        //   label: 'Facebook',
        //   value: 'facebook',
        // },
        {
          label: 'Instagram',
          value: 'instagram',
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'width',
      type: 'number',
    },
  ],
  labels: {
    plural: 'Social embeds',
    singular: 'Social embed',
  },
};
