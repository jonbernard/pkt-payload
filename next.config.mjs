import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: false,
  },
  ...(!process?.env?.NODE_ENV === 'production'
    ? {
        compiler: {
          removeConsole: {
            exclude: ['error', 'info'],
          },
          reactRemoveProperties: true,
        },
      }
    : {}),
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'new.pktphichapter.org',
      },
      {
        protocol: 'https',
        hostname: 'pktphichapter.org',
      },
    ],
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
      preventFullImport: true,
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
      preventFullImport: true,
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
      preventFullImport: true,
    },
    '@mui/styles': {
      transform: '@mui/styles/{{member}}',
      preventFullImport: true,
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
      preventFullImport: true,
    },
  },
};

export default withPayload(nextConfig);
