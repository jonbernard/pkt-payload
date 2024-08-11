import path from 'path';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { en } from 'payload/i18n/en';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';

import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Categories } from '@/collections/categories';
import { Users } from '@/collections/users';
import { Pages } from '@/collections/pages';
import { Posts } from '@/collections/posts';
import { Media } from '@/collections/media';
import { Members } from '@/collections/members';

import { Logo } from '@/components/graphics/Logo';
import { Icon } from '@/components/graphics/Icon';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// const sendGridAPIKey = process.env.SENDGRID_API_KEY!;

// ts-ignore
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
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
});
