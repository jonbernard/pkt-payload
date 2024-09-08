/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Partner".
 */
export type Partner =
  | {
      name?: string | null;
      current?: boolean | null;
      id?: string | null;
    }[]
  | null;
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Children".
 */
export type Children =
  | {
      name?: string | null;
      id?: string | null;
    }[]
  | null;

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    members: Member;
    posts: Post;
    pages: Page;
    categories: Category;
    menus: Menu;
    media: Media;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "members".
 */
export interface Member {
  id: number;
  prefix?:
    | ('Mr' | 'Master' | 'Miss' | 'Mrs' | 'Ms' | 'Mx' | 'Dr' | 'Rev' | 'Col' | 'Cdr' | 'Maj' | 'Hon' | 'Lt')
    | null;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  suffix?: string | null;
  preferredName?: string | null;
  nickname?: string | null;
  fullNamePreferred?: string | null;
  location?: string | null;
  class?: number | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  fullAddress?: string | null;
  email?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  age?: number | null;
  subscribed?: boolean | null;
  bigBrother?: (number | null) | Member;
  littleBrothers?: (number | Member)[] | null;
  major?: string | null;
  occupation?: Work;
  lost?: boolean | null;
  dead?: boolean | null;
  deathDate?: string | null;
  obitUrl?: string | null;
  hrog?: boolean | null;
  hrogDate?: string | null;
  national?: {
    nhqId?: string | null;
    initiation?: string | null;
    pin?: string | null;
  };
  notes?: string | null;
  slug?: string | null;
  user?: (number | null) | User;
  image?: (number | null) | Media;
  spouse?: Partner;
  children?: Children;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "work".
 */
export interface Work {
  title?: string | null;
  employer?: string | null;
  usService?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name?: string | null;
  roles?: ('admin' | 'user')[] | null;
  member?: (number | null) | Member;
  image?: (number | null) | Media;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  text?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  relatedLinks?:
    | {
        type?: ('reference' | 'custom') | null;
        newTab?: boolean | null;
        reference?:
          | ({
              relationTo: 'pages';
              value: number | Page;
            } | null)
          | ({
              relationTo: 'posts';
              value: number | Post;
            } | null);
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  appearance?: ('button' | 'link') | null;
  description?: string | null;
  categories?: (number | Category)[] | null;
  publishedAt?: string | null;
  image?: number | Media | null;
  authors?: (number | User)[] | null;
  populatedAuthors?:
    | {
        id?: string | null;
        name?: string | null;
      }[]
    | null;
  slug?: string | null;
  url?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  shortTitle?: string | null;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  relatedLinks?:
    | {
        type?: ('reference' | 'custom') | null;
        newTab?: boolean | null;
        reference?:
          | ({
              relationTo: 'pages';
              value: number | Page;
            } | null)
          | ({
              relationTo: 'posts';
              value: number | Post;
            } | null);
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  appearance?: ('button' | 'link') | null;
  description?: string | null;
  categories?: (number | Category)[] | null;
  slug: string;
  publishedAt?: string | null;
  url?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "menus".
 */
export interface Menu {
  id: number;
  slug?: string | null;
  label?: string | null;
  items?:
    | {
        type?: ('reference' | 'custom') | null;
        newTab?: boolean | null;
        reference?:
          | ({
              relationTo: 'pages';
              value: number | Page;
            } | null)
          | ({
              relationTo: 'posts';
              value: number | Post;
            } | null);
        url?: string | null;
        label?: string | null;
        submenu?:
          | {
              type?: ('reference' | 'custom') | null;
              newTab?: boolean | null;
              reference?:
                | ({
                    relationTo: 'pages';
                    value: number | Page;
                  } | null)
                | ({
                    relationTo: 'posts';
                    value: number | Post;
                  } | null);
              url?: string | null;
              label?: string | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BannerBlock".
 */
export interface BannerBlock {
  style: 'info' | 'warning' | 'error' | 'success';
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'banner';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}