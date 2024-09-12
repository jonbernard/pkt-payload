import type { Block } from 'payload';

const envIds: Partial<
  Record<'development' | 'production' | 'test', { scf: string; alumniDues: string }>
> = {
  development: {
    scf: 'buy_btn_1PyHGMBG0I7fLNNPrkFIKYyB',
    alumniDues: 'buy_btn_1PyKeFBG0I7fLNNPsi6KUWu0',
  },
  production: {
    scf: 'buy_btn_1PyKz0BG0I7fLNNP3vq27sPX',
    alumniDues: 'buy_btn_1PyKz5BG0I7fLNNPcaeNpy3z',
  },
};
const ids = envIds[process.env.NODE_ENV];

const defaultEmbedId = ids?.scf || '';

export const Payments: Block = {
  slug: 'payments',
  fields: [
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      defaultValue: 'buy-button',
      required: true,
      options: [
        {
          label: 'Stripe buy button',
          value: 'buy-button',
        },
      ],
    },
    {
      name: 'embed',
      label: 'Predefined embeds',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Second Century Fund',
          value: defaultEmbedId,
        },
        {
          label: 'Alumni Dues',
          value: ids?.alumniDues || '',
        },
        {
          label: 'Other...',
          value: 'other',
        },
      ],
    },
    {
      name: 'customId',
      type: 'text',
      label: 'Custom ID',
      admin: {
        condition: (data) => data?.embed === 'other',
      },
    },
  ],
};
// buy_btn_1PyHGMBG0I7fLNNPrkFIKYyB
