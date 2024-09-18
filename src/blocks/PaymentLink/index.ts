import type { Block } from 'payload';

export const PaymentLinkBlocks: Block = {
  slug: 'paymentLinkBlock',
  labels: {
    singular: 'Payment link',
    plural: 'Payment links',
  },
  fields: [
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      defaultValue: 'fullscreen',
      required: true,
      options: [
        {
          label: 'Fullscreen banner',
          value: 'fullscreen',
        },
        {
          label: 'Inline (centered)',
          value: 'inlineCentered',
        },
        {
          label: 'Card',
          value: 'card',
        },
      ],
    },
    {
      name: 'color',
      label: 'Card color',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Theme color',
          value: 'default',
        },
        {
          label: 'Red',
          value: 'red',
        },
      ],
      admin: {
        condition: (_, { type }) => type === 'card',
      },
    },
    {
      name: 'paymentLink',
      label: 'Payment link',
      type: 'relationship',
      relationTo: 'paymentLinks',
      required: true,
    },
    {
      name: 'text',
      label: 'Text',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'linkText',
      label: 'Action text',
      type: 'text',
    },
  ],
};
