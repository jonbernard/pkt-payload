import { CollectionConfig } from 'payload';
import { admin, fieldAdmin } from '@/access/admin';
import { authenticated } from '@/access/authenticated';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
    listSearchableFields: ['name', 'email'],
  },
  auth: {
    tokenExpiration: 7 * 24 * 60 * 60, // How many seconds to keep the user logged in (604800 = 7 days)
    // verify: true, // Require email verification before being allowed to authenticate
    lockTime: 600 * 1000, // Time period to allow the max login attempts
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
  },
  access: {
    admin,
    delete: admin,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        create: fieldAdmin,
        read: fieldAdmin,
        update: fieldAdmin,
      },
      defaultValue: ['user'],
      hasMany: true,
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
    },
    {
      name: 'member',
      type: 'relationship',
      label: 'Member',
      relationTo: 'members',
    },
    {
      name: 'image',
      type: 'relationship',
      label: 'Image',
      relationTo: 'media',
    },
  ],
  timestamps: true,
};
