import type { AccessArgs, FieldAccess } from 'payload';

import type { User } from '@payload-types';

export const admin: (args: AccessArgs<User>) => boolean = ({ req: { user } }) =>
  user?.roles?.includes('admin') || false;
export const fieldAdmin: FieldAccess = ({ req: { user } }) =>
  user?.roles?.includes('admin') || false;
