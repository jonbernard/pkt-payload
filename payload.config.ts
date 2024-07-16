import path from 'path';
import { postgresAdapter } from '@payloadcms/db-postgres';
// import nodemailerSendgrid from 'nodemailer-sendgrid';
import { en } from 'payload/i18n/en';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';

import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Categories } from '@/collections/Categories';
import { Users } from '@/collections/Users';
import { Pages } from '@/collections/Pages';
import { Posts } from '@/collections/Posts';
import { Media } from '@/collections/Media';
import { Members } from '@/collections/Members';

import { Logo } from '@/components/graphics/Logo';
import { Icon } from '@/components/graphics/Icon';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const sendGridAPIKey = process.env.SENDGRID_API_KEY!;

export default buildConfig({
  admin: {
    // Add your own logo and icon here
    components: {
      graphics: {
        Icon,
        Logo,
      },
    },
    // Add your own meta data here
    meta: {
      // favicon: '/assets/favicon.svg',
      // ogImage: '/assets/ogImage.png',
      titleSuffix: '- Phi Chapter of the Phi Kappa Tau Fraternity',
    },
  },
  editor: lexicalEditor(),
  collections: [Members, Posts, Pages, Categories, Media, Users],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  i18n: {
    supportedLanguages: { en },
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    });

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
          roles: ['admin', 'user'],
        },
      });
    }
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
  // ...(sendGridAPIKey
  //   ? {
  //       email: async () => ({
  //         transportOptions: nodemailerSendgrid({
  //           apiKey: sendGridAPIKey,
  //         }),
  //         fromName: 'Admin',
  //         fromAddress: 'admin@example.com',
  //       }),
  //     }
  //   : {}),
});
