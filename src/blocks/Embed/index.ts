import type { Block } from 'payload';

export const Embed: Block = {
  slug: 'embed',
  fields: [
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
      admin: {
        language: 'html',
      },
    },
  ],
};
