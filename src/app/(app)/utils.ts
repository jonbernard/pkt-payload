import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export const getPayload = async () =>
  await getPayloadHMR({
    config,
  });
