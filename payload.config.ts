import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import path from 'path';
import { buildConfig } from 'payload';
import { en } from 'payload/i18n/en';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import { Categories } from '@/collections/categories';
import { Media } from '@/collections/media';
import { Members } from '@/collections/members';
import { Menus } from '@/collections/menus';
import { Pages } from '@/collections/pages';
import { PaymentLinks } from '@/collections/paymentLinks';
import { Posts } from '@/collections/posts';
import { Users } from '@/collections/users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const sendGridAPIKey = process.env.SENDGRID_API_KEY!;

export default buildConfig({
  admin: {
    // Add your own logo and icon here
    components: {
      graphics: {
        Icon: {
          path: 'src/app/(payload)/components/graphics/Icon/index.tsx',
        },
        Logo: {
          path: 'src/app/(payload)/components/graphics/Logo/index.tsx',
        },
      },
    },
    // Add your own meta data here
    meta: {
      // favicon: '/assets/favicon.svg',
      // ogImage: '/assets/ogImage.png',
      titleSuffix: '- Phi Chapter of the Phi Kappa Tau Fraternity',
    },
  },
  collections: [Members, Posts, Pages, Categories, PaymentLinks, Menus, Media, Users],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  editor: lexicalEditor(),
  email: nodemailerAdapter({
    defaultFromAddress: 'email@pktphichapter.org',
    defaultFromName: 'Phi Chapter of Phi Kappa Tau',
    // Any Nodemailer transport
    transport: await nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: sendGridAPIKey,
      }),
    ),
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
          name: 'Default Admin',
          email: 'dev@payloadcms.com',
          password: 'test',
          roles: ['admin', 'user'],
        },
      });
    }
  },
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
});
