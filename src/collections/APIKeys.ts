import { CollectionConfig } from 'payload/types';
import { admins } from '../access/admins';

export const APIKeys: CollectionConfig = {
  slug: 'apiKeys',
  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  fields: [],
};
