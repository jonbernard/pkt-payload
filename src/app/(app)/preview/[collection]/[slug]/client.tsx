'use client';

import React from 'react';

import { CollectionSlug, DataFromCollectionSlug, PaginatedDocs } from 'payload';

import { CircularProgress } from '@mui/material';

import { useLivePreview } from '@payloadcms/live-preview-react';

import PageContent from '@/app/(app)/[pageSlug]/content';
import HomeContent from '@/app/(app)/content';
import PostContent from '@/app/(app)/news/[slug]/content';
import { SerializedLexicalNode } from '@/components/richText/types';
import { Post } from '@payload-types';

type Props = {
  collection: CollectionSlug;
  page: DataFromCollectionSlug<'posts' | 'pages'>;
  news: PaginatedDocs<Post>;
};

const Client = ({ collection, news, page: serverData }: Props) => {
  const { data: page, isLoading } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    initialData: serverData,
  });

  if (isLoading) {
    return (
      <main>
        <article className="flex items-center justify-center z-50 fixed top-0 left-0 w-full h-full bg-gray-dark">
          <CircularProgress />
        </article>
      </main>
    );
  }

  const content = page.content?.root?.children as SerializedLexicalNode[];

  if (collection === 'pages' && page.slug === 'home')
    return (
      <HomeContent body={content} {...(page as DataFromCollectionSlug<'pages'>)} news={news} />
    );
  if (collection === 'pages')
    return <PageContent body={content} {...(page as DataFromCollectionSlug<'pages'>)} />;
  if (collection === 'posts')
    return <PostContent body={content} {...(page as DataFromCollectionSlug<'posts'>)} />;

  return (
    <main>
      <article>Preview not available for {collection}</article>
    </main>
  );
};

export default Client;
