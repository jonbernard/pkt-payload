import type { Block, Field } from 'payload';

import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'w-1/2',
    options: [
      {
        label: 'One Forth',
        value: 'w-1/4',
      },
      {
        label: 'One Third',
        value: 'w-1/3',
      },
      {
        label: 'Half',
        value: 'w-1/2',
      },
      {
        label: 'Two Thirds',
        value: 'w-2/3',
      },
      {
        label: 'Three Forths',
        value: 'w-3/4',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }), FixedToolbarFeature(), InlineToolbarFeature()];
      },
    }),
    label: false,
  },
];

export const Content: Block = {
  slug: 'content',
  fields: [
    {
      name: 'align',
      type: 'select',
      defaultValue: 'flex-start',
      options: [
        {
          label: 'Start',
          value: 'flex-start',
        },
        {
          label: 'End',
          value: 'flex-end',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Stretch',
          value: 'stretch',
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
  ],
};
