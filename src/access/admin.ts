import type { User } from '@payload-types';
import type { AccessArgs, FieldAccess } from 'payload';

export const admin: (args: AccessArgs<User>) => boolean = ({ req: { user } }) => user?.roles?.includes('admin') || false;
export const fieldAdmin: FieldAccess = ({ req: { user } }) => user?.roles?.includes('admin') || false;
