import type { CollectionConfig } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical';

import { admin } from '@/access/admin';
import { appearanceOptions, linkFields } from '@/fields/headerLink';

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';
import { Banner } from '../../blocks/Banner';
import { Code } from '../../blocks/Code';
import { MediaBlock } from '../../blocks/MediaBlock';
import { generatePreviewPath } from '../../utilities/generatePreviewPath';
import { revalidatePage } from './hooks/revalidatePage';

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: admin,
    delete: admin,
    read: authenticatedOrPublished,
    update: admin,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          collection: 'pages',
          slug: typeof data?.slug === 'string' ? data.slug : '',
        });
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
      },
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              label: false,
            },
            {
              name: 'relatedLinks',
              type: 'array',
              label: 'Related links',
              maxRows: 6,
              labels: {
                singular: 'Link',
                plural: 'Links',
              },
              fields: linkFields,
            },
            {
              name: 'appearance',
              type: 'select',
              admin: {
                description: 'Choose how the link should be rendered.',
                condition: (data) => (data.relatedLinks || [])?.length > 0,
              },
              defaultValue: appearanceOptions.button.value,
              options: [appearanceOptions.button, appearanceOptions.link],
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Header description',
            },
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta title',
            },
            {
              name: 'metaDescription',
              type: 'text',
              label: 'Meta description',
            },
            {
              name: 'categories',
              type: 'relationship',
              hasMany: true,
              relationTo: 'categories',
            },
          ],
          label: 'Meta',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      index: true,
      unique: true,
      required: true,
      label: 'Slug',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return `/${data?.slug && data.slug !== 'home' ? data.slug : ''}`;
          },
        ],
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.url;
          },
        ],
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
};
