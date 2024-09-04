import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: false,
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
