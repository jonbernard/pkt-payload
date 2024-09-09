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
import { slugField } from '../../fields/slug';
import { generatePreviewPath } from '../../utilities/generatePreviewPath';
import { populateAuthors } from './hooks/populateAuthors';
import { revalidateCache } from './hooks/revalidatePath';
import { admin } from '@/access/admin';
import { appearanceOptions, linkFields } from '@/fields/headerLink';
import { validateSlug } from './hooks/validateSlug';

export const Posts: CollectionConfig = {
  slug: 'posts',
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
          collection: 'posts',
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
              required: true,
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
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
          ],
          label: 'Meta',
        },
      ],
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
      name: 'image',
      type: 'upload',
      label: 'Preview image',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField(),
    {
      name: 'url',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return `/news/${data?.slug}`;
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
    afterChange: [validateSlug, revalidateCache],
    afterRead: [populateAuthors],
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
};
