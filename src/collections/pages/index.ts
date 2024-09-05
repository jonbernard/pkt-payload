import type { CollectionConfig } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical';

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished';
import { Banner } from '../../blocks/Banner';
import { Code } from '../../blocks/Code';
import { MediaBlock } from '../../blocks/MediaBlock';
import { generatePreviewPath } from '../../utilities/generatePreviewPath';
import { revalidatePage } from './hooks/revalidatePage';
import { admin } from '@/access/admin';

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
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'shortTitle',
          type: 'text',
          required: true,
          label: 'Short title',
        },
      ],
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
              required: true,
            },
            {
              name: 'related',
              type: 'relationship',
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: ['pages', 'posts'],
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'description',
              type: 'textarea',
              label: 'Short description',
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
