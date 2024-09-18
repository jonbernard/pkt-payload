import type { Block } from 'payload';

import { lexicalEditor } from '@payloadcms/richtext-lexical';

import { editorFeatures } from '../Content/editor';

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  fields: [
    {
      name: 'position',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen',
        },
        {
          label: 'Centered',
          value: 'centered',
        },
        {
          label: 'Left (Wrapped)',
          value: 'left',
        },
        {
          label: 'Right (Wrapped)',
          value: 'right',
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      label: 'Wrapping text',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, ...editorFeatures(false)];
        },
      }),
      admin: {
        condition: (_, { position }) => ['left', 'right'].includes(position),
      },
    },
  ],
};
