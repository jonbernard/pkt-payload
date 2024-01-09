import type { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import type { CollectionConfig } from 'payload/types';

import { toPairs } from 'lodash';

import { admins } from '../../access/admins';
import { populateAuthors } from './hooks/populateAuthors';
import { populatePublishedAt } from './hooks/populatePublishedAt';
import { revalidateMember } from './hooks/revalidateMember';
import states from './states.json';
import formatSlug from '../../hooks/formatSlug';

const prefixes = ['Mr', 'Master', 'Miss', 'Mrs', 'Ms', 'Mx'];

export const Members: CollectionConfig = {
  slug: 'members',
  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },
  admin: {
    defaultColumns: [
      'fullNamePreferred',
      'class',
      'fullAddress',
      'email',
      'lost',
      'dead',
      'createdAt',
      'updatedAt',
    ],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/members/${doc?.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`;
    },
    useAsTitle: 'fullNamePreferred',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'prefix',
          type: 'select',
          admin: {
            width: '15%',
          },
          defaultValue: prefixes[0],
          options: prefixes.map(p => ({
            label: p,
            value: p,
          })),
        },
        {
          name: 'firstName',
          type: 'text',
          admin: {
            width: '30%',
          },
          label: 'First name',
          required: true,
        },
        {
          name: 'middleName',
          type: 'text',
          admin: {
            width: '15%',
          },
          label: 'Middle name',
        },
        {
          name: 'lastName',
          type: 'text',
          admin: {
            width: '30%',
          },
          label: 'Last name',
          required: true,
        },
        {
          name: 'suffix',
          type: 'text',
          admin: {
            width: '10%',
          },
          label: 'Suffix',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'preferredName',
          type: 'text',
          label: 'Preferred name',
        },
        {
          name: 'nickname',
          type: 'text',
          label: 'Nickname',
        },
      ],
    },
    {
      name: 'fullNamePreferred',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return `${data?.preferredName || data?.firstName} ${data?.lastName}`;
          },
        ],
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.fullNamePreferred;
          },
        ],
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return `${data?.city}${data?.state ? `, ${data.state}` : ''}${
              data?.country ? `, ${data.country}` : ''
            }`;
          },
        ],
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.location;
          },
        ],
      },
    },
    {
      name: 'class',
      type: 'number',
      label: 'Class',
      max: 2100,
      min: 1900,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          admin: {
            width: '40%',
          },
          label: 'City',
        },
        {
          name: 'state',
          type: 'select',
          admin: {
            width: '20%',
          },
          label: 'State',
          options: toPairs(states).map(([abr, name]) => ({
            label: name,
            value: abr,
          })),
        },
        {
          name: 'zip',
          type: 'text',
          admin: {
            width: '20%',
          },
          label: 'Zip',
        },
        {
          name: 'country',
          type: 'text',
          admin: {
            width: '20%',
          },
          label: 'Country',
        },
      ],
    },
    {
      name: 'fullAddress',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return `${data?.address ? `${data.address}, ` : ''}${data?.city}${
              data?.state ? `, ${data.state}` : ''
            }${data?.zip ? ` ${data.zip}` : ''}${data?.country ? `, ${data.country}` : ''}`;
          },
        ],
        beforeChange: [
          ({ siblingData }) => {
            delete siblingData.fullAddress;
          },
        ],
      },
      label: 'Address',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: {
            width: '50%',
          },
          label: 'Email',
        },
        {
          name: 'altEmail',
          type: 'email',
          admin: {
            width: '50%',
          },
          label: 'Alternate email',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Phone',
        },
        {
          name: 'altPhone',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Alternate Phone',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'bigBrother',
          type: 'relationship',
          admin: {
            width: '50%',
          },
          label: 'Big brother',
          relationTo: 'members',
        },
        {
          name: 'littleBrothers',
          type: 'relationship',
          admin: {
            width: '50%',
          },
          hasMany: true,
          label: 'Little brothers',
          relationTo: 'members',
        },
      ],
    },
    {
      name: 'major',
      type: 'text',
      label: 'Major',
    },
    {
      name: 'occupation',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'employer',
              type: 'text',
              label: 'Employer',
            },
          ],
        },
        {
          name: 'usService',
          type: 'text',
          label: 'US Service',
        },
      ],
      interfaceName: 'work',
    },
    {
      name: 'lost',
      type: 'checkbox',
      defaultValue: false,
      label: 'Lost member',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'dead',
          type: 'checkbox',
          defaultValue: false,
          label: 'Chapter eternal',
        },
        {
          name: 'deathDate',
          type: 'date',
          admin: {
            condition: data => {
              if (data.dead) {
                return true;
              } else {
                return false;
              }
            },
          },
          label: 'Date of death',
        },
        {
          name: 'obitUrl',
          type: 'text',
          admin: {
            condition: data => {
              if (data.dead) {
                return true;
              } else {
                return false;
              }
            },
          },
          label: 'Obituary URL',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'hrog',
          type: 'checkbox',
          defaultValue: false,
          label: 'HROG member',
        },
        {
          name: 'hrogDate',
          type: 'date',
          admin: {
            condition: data => {
              if (data.hrog) {
                return true;
              } else {
                return false;
              }
            },
          },
          label: 'Date',
        },
      ],
    },
    {
      name: 'national',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'nhqId',
              type: 'text',
              label: 'NHQ-ID',
            },
            {
              name: 'initiation',
              type: 'date',
              label: 'Initiation date',
            },
            {
              name: 'pin',
              type: 'text',
              label: 'PIN',
            },
          ],
        },
      ],
      label: 'National data',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes',
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug(['email', 'fullNamePreferred'])],
      },
      index: true,
      label: 'Slug',
    },
    {
      name: 'user',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      label: 'User',
      relationTo: 'users',
    },
    {
      name: 'spouse',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data }: RowLabelArgs) => {
            return data?.name || `Spouse`;
          },
        },
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
        },
        {
          name: 'current',
          type: 'checkbox',
          defaultValue: true,
          label: 'Current',
        },
      ],
      interfaceName: 'Partner',
      label: 'Spouse/Partner',
    },
    {
      name: 'children',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.name || `Child ${String(index).padStart(2, '0')}`;
          },
        },
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
        },
      ],
      interfaceName: 'Children',
      label: 'Child(ren)',
      labels: {
        plural: 'Children',
        singular: 'Child',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateMember],
    afterRead: [populateAuthors],
    beforeChange: [populatePublishedAt],
  },
};
