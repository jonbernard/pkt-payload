import { formatSlug, admins, populateAuthors } from '../utils';
import { CollectionConfig } from 'payload';
import { Member } from '@payload-types';

const prefixes = ['Mr', 'Master', 'Miss', 'Mrs', 'Ms', 'Mx', 'Dr', 'Rev', 'Col', 'Cdr', 'Maj', 'Hon', 'Lt'];

export const MemberCollection: CollectionConfig = {
  slug: 'members',
  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },
  admin: {
    defaultColumns: ['fullNamePreferred', 'class', 'fullAddress', 'email', 'lost', 'dead', 'createdAt', 'updatedAt'],
    preview: (doc) => {
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
          options: prefixes.map((p) => ({
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
            return `${data?.city}${data?.state ? `, ${data.state}` : ''}${data?.country ? `, ${data.country}` : ''}`;
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
          type: 'text',
          admin: {
            width: '20%',
          },
          label: 'State',
          // options: toPairs({
          //   AL: 'Alabama',
          //   AK: 'Alaska',
          //   AZ: 'Arizona',
          //   AR: 'Arkansas',
          //   CA: 'California',
          //   CO: 'Colorado',
          //   CT: 'Connecticut',
          //   DE: 'Delaware',
          //   FL: 'Florida',
          //   GA: 'Georgia',
          //   HI: 'Hawaii',
          //   ID: 'Idaho',
          //   IL: 'Illinois',
          //   IN: 'Indiana',
          //   IA: 'Iowa',
          //   KS: 'Kansas',
          //   KY: 'Kentucky',
          //   LA: 'Louisiana',
          //   ME: 'Maine',
          //   MD: 'Maryland',
          //   MA: 'Massachusetts',
          //   MI: 'Michigan',
          //   MN: 'Minnesota',
          //   MS: 'Mississippi',
          //   MO: 'Missouri',
          //   MT: 'Montana',
          //   NE: 'Nebraska',
          //   NV: 'Nevada',
          //   NH: 'New Hampshire',
          //   NJ: 'New Jersey',
          //   NM: 'New Mexico',
          //   NY: 'New York',
          //   NC: 'North Carolina',
          //   ND: 'North Dakota',
          //   OH: 'Ohio',
          //   OK: 'Oklahoma',
          //   OR: 'Oregon',
          //   PA: 'Pennsylvania',
          //   RI: 'Rhode Island',
          //   SC: 'South Carolina',
          //   SD: 'South Dakota',
          //   TN: 'Tennessee',
          //   TX: 'Texas',
          //   UT: 'Utah',
          //   VT: 'Vermont',
          //   VA: 'Virginia',
          //   WA: 'Washington',
          //   WV: 'West Virginia',
          //   WI: 'Wisconsin',
          //   WY: 'Wyoming',
          //   '': 'Unknown',
          // }).map(([abr, name]) => ({
          //   label: name,
          //   value: abr,
          // })),
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
            return `${data?.address ? `${data.address}, ` : ''}${data?.city}${data?.state ? `, ${data.state}` : ''}${
              data?.zip ? ` ${data.zip}` : ''
            }${data?.country ? `, ${data.country}` : ''}`;
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
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Email',
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Phone',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'dateOfBirth',
          type: 'date',
          label: 'Date of birth',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'MMMM dd yyy',
            },
            width: '50%',
          },
        },
        {
          name: 'age',
          type: 'number',
          label: 'Age',
          max: 150,
          min: 0,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'subscribed',
          type: 'checkbox',
          defaultValue: true,
          label: 'Subscribed to communication',
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
            condition: (data) => {
              if (data.dead) {
                return true;
              } else {
                return false;
              }
            },
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'MMMM dd yyy',
            },
            width: '50%',
          },
          label: 'Date of death',
        },
        {
          name: 'obitUrl',
          type: 'text',
          admin: {
            condition: (data) => {
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
            condition: (data) => {
              if (data.hrog) {
                return true;
              } else {
                return false;
              }
            },
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'MMMM dd yyy',
            },
            width: '50%',
          },
          label: 'Joined HROG',
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
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                  displayFormat: 'MMMM dd yyy',
                },
                width: '50%',
              },
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
        beforeValidate: [formatSlug<Member>((member: Member) => `${member?.preferredName || member?.firstName} ${member?.lastName}`)], // , 'email'
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
          RowLabel: ({ data }) => {
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
          RowLabel: ({ data, index }) => {
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
    afterRead: [populateAuthors],
    // beforeChange: [populatePublishedAt],
  },
};
