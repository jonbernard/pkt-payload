import { CollectionSlug } from 'payload';

export const generatePreviewPath = ({ collection, slug }: { collection: CollectionSlug; slug: string }) => `/preview/${collection}/${slug}`;
