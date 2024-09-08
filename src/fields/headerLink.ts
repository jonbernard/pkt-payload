import type { Field } from 'payload';

export type LinkAppearances = 'button' | 'link';

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  button: {
    label: 'Button',
    value: 'button',
  },
  link: {
    label: 'Link',
    value: 'link',
  },
};

export const linkFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'type',
        type: 'radio',
        admin: {
          layout: 'horizontal',
        },
        defaultValue: 'reference',
        options: [
          {
            label: 'Internal link',
            value: 'reference',
          },
          {
            label: 'Custom URL',
            value: 'custom',
          },
        ],
      },
      {
        name: 'newTab',
        type: 'checkbox',
        admin: {
          style: {
            alignSelf: 'flex-end',
            textAlign: 'right',
          },
        },
        label: 'Open in new tab',
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'reference',
        type: 'relationship',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'reference',
        },
        label: 'Document to link to',
        maxDepth: 1,
        relationTo: ['pages', 'posts'],
        required: true,
      },
      {
        name: 'url',
        type: 'text',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'custom',
        },
        label: 'Custom URL',
        required: true,
      },
      {
        name: 'label',
        type: 'text',
        label: 'Label',
      },
    ],
  },
];
