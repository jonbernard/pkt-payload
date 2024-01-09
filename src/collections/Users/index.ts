import type { CollectionConfig } from 'payload/types';

import { admins } from '../../access/admins';
import { anyone } from '../../access/anyone';
import adminsAndUser from '../../access/adminsAndUser';
import { checkRole } from './checkRole';
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin';
import { loginAfterCreate } from './hooks/loginAfterCreate';

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: anyone,
    delete: admins,
    read: adminsAndUser,
    update: adminsAndUser,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 7 * 24 * 60 * 60, // How many seconds to keep the user logged in (604800 = 7 days)
    // verify: true, // Require email verification before being allowed to authenticate
    lockTime: 600 * 1000, // Time period to allow the max login attempts
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
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
        create: admins,
        read: admins,
        update: admins,
      },
      defaultValue: ['user'],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
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
  ],
  hooks: {
    afterChange: [loginAfterCreate],
  },
  timestamps: true,
};

export default Users;
