'use client';

import React from 'react';
import { CollectionSlug, DataFromCollectionSlug, PaginatedDocs } from 'payload';
import { useLivePreview } from '@payloadcms/live-preview-react';

import { SerializedLexicalNode } from '@/components/richText/types';

import HomeContent from '@/app/(app)/content';
import PageContent from '@/app/(app)/[pageSlug]/content';
import PostContent from '@/app/(app)/news/[slug]/content';
import { Post } from '@payload-types';

type Props = {
  collection: CollectionSlug;
  page: DataFromCollectionSlug<'posts' | 'pages'>;
  news: PaginatedDocs<Post>;
};

const Client = ({ collection, news, page: serverData }: Props) => {
  const { data: page } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    depth: 3,
    initialData: serverData,
  });

  const content = page.content?.root?.children as SerializedLexicalNode[];

  if (collection === 'pages' && page.slug === 'home')
    return <HomeContent body={content} {...(page as DataFromCollectionSlug<'pages'>)} news={news} />;
  if (collection === 'pages') return <PageContent body={content} {...(page as DataFromCollectionSlug<'pages'>)} />;
  if (collection === 'posts') return <PostContent body={content} {...(page as DataFromCollectionSlug<'posts'>)} />;

  return (
    <main>
      <article>Preview not available for {collection}</article>
    </main>
  );
};

export default Client;
