import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload';
import type Stripe from 'stripe';

import { admin } from '@/access/admin';
import { anyone } from '@/access/anyone';
import { createPaymentLink, getPriceId } from '@/stripe';
import { PaymentLink } from '@payload-types';

const beforeChangeHook: CollectionBeforeChangeHook<PaymentLink> = async ({
  data, // incoming data to update or create with
  // operation, // name of the operation ie. 'create', 'update'
}) => {
  if (!data.paymentLinkId && data.products) {
    const { paymentLink, products } = await createPaymentLink(
      data.products.map((product) => ({
        name: product.name || 'Donation',
        description: product.description || '',
        images: product.images || [],
        price: product.customPrice
          ? {
              currency: 'usd',
              custom_unit_amount: {
                enabled: true,
              },
            }
          : ({
              currency: 'usd',
              unit_amount: product.value || 0,
            } as Stripe.PriceCreateParams),
      })),
      data.redirect || '',
      { submit_type: data.submitType || 'donate' },
    );

    data.paymentLinkId = paymentLink.id;
    data.paymentLinkUrl = paymentLink.url;
    data.products = data.products.map((product) => {
      const { stripeProduct } =
        products.find(
          ({ stripeProduct: p }) =>
            p.name === product.name && p.description === product.description,
        ) || {};

      return {
        ...product,
        productId: stripeProduct?.id || null,
        priceId: stripeProduct ? getPriceId(stripeProduct) || null : null,
      };
    });
  }

  return data;
};

export const PaymentLinks: CollectionConfig = {
  slug: 'paymentLinks',
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  hooks: {
    beforeChange: [beforeChangeHook],
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'donate',
      options: [
        {
          label: 'Donate',
          value: 'donate',
        },
      ],
    },
    {
      name: 'paymentLinkId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        components: {
          afterInput: [
            {
              path: 'src/collections/paymentLinks/copyButton.tsx',
            },
          ],
        },
      },
    },
    {
      name: 'paymentLinkUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        components: {
          afterInput: [
            {
              path: 'src/collections/paymentLinks/copyButton.tsx',
            },
          ],
        },
      },
    },
    {
      name: 'products',
      type: 'array',
      labels: {
        singular: 'Product',
        plural: 'Products',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'images',
          type: 'text',
          hasMany: true,
        },
        {
          name: 'customPrice',
          type: 'checkbox',
          defaultValue: true,
          label: 'Allow user to set amount',
        },
        {
          name: 'value',
          type: 'number',
          label: 'Value',
          min: 0,
          admin: {
            condition: (data, siblingData) => siblingData?.customPrice === false,
          },
        },
        {
          name: 'productId',
          type: 'text',
          hidden: true,
        },
        {
          name: 'priceId',
          type: 'text',
          hidden: true,
        },
      ],
      interfaceName: 'Products',
      label: 'Products',
    },
    {
      name: 'submitType',
      type: 'select',
      defaultValue: 'donate',
      options: [
        {
          label: 'Book',
          value: 'book',
        },
        {
          label: 'Donate',
          value: 'donate',
        },
        {
          label: 'Pay',
          value: 'pay',
        },
      ],
    },
    {
      name: 'redirect',
      type: 'text',
      label: 'Redirect URL',
      required: true,
    },
  ],
};
