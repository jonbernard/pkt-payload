import type { Block } from 'payload';

export const Video: Block = {
  slug: 'video',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'youtube',
      options: [
        {
          label: 'Youtube',
          value: 'youtube',
        },
      ],
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
    },
    {
      name: 'tile',
      label: 'Title',
      type: 'text',
    },
  ],
};
