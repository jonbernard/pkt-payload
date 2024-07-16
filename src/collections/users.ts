import { CollectionConfig } from 'payload'
import { admins, adminsAndUser, checkRole, ensureFirstUserIsAdmin } from './utils'
import { AfterChangeHook } from 'node_modules/payload/dist/collections/config/types'

export const loginAfterCreate: AfterChangeHook = async ({
  doc,
  operation,
  req,
  req: { body = {}, payload, res },
}) => {
  if (operation === 'create' && !req.user) {
    const { email, password } = body

    if (email && password) {
      const { token, user } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,
        res,
      })

      return {
        ...doc,
        token,
        user,
      }
    }
  }

  return doc
}

export const UserCollection: CollectionConfig = {
  slug: 'users',
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
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    delete: admins,
    read: adminsAndUser,
    update: adminsAndUser,
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
}
