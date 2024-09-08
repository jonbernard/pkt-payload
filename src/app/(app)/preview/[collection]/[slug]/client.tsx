'use client';

import React from 'react';
import { isNumber } from 'lodash';
import { CollectionSlug, DataFromCollectionSlug } from 'payload';
import { useLivePreview } from '@payloadcms/live-preview-react';

import Hero from '@/components/hero';
import { SerializedLexicalNode } from '@/components/richText/types';
import Content from '@/components/richText';
import RelatedPosts from '@/components/relatedPosts';

type Props = {
  collection: CollectionSlug;
  page: DataFromCollectionSlug<'posts' | 'pages'>;
};

const Client = ({ collection, page: serverData }: Props) => {
  const { data: page } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    depth: 2,
    initialData: serverData,
  });

  const content = page.content?.root?.children as SerializedLexicalNode[];

  return (
    <main>
      <article>
        <Hero
          title={page.title}
          author={'authors' in page && page.authors?.[0] && !isNumber(page.authors?.[0]) ? page.authors[0]?.name : undefined}
          date={(collection !== 'pages' && (page.updatedAt || page.createdAt)) || undefined}
        />

        <section id="content" className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-8">
          {content?.map((node, index) => (
            <Content key={index} data={node} />
          ))}
          {'relatedLinks' in page && (page.relatedLinks || []).length > 0 && <RelatedPosts posts={page.relatedLinks} />}
        </section>
      </article>
    </main>
  );
};

export default Client;
