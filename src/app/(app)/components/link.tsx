'use client';

import { useMemo } from 'react';
import { isNumber } from 'lodash';
import NextLink from 'next/link';

import { Page, Post } from '@payload-types';

type Props = {
  type?: ('reference' | 'custom') | null;
  newTab?: boolean | null;
  label?: string | null;
  reference?:
    | {
        relationTo: 'pages';
        value: number | Page;
      }
    | {
        relationTo: 'posts';
        value: number | Post;
      }
    | null;
  url?: string | null;
  id?: string | null;
};

const className =
  'dark:text-body-color-dark mb-6 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl border-current border-dotted border-b decoration-none';

const Link = (props: Props) => {
  const { label: passedLabel, newTab, reference, type, url: passedUrl } = props;

  const label = useMemo(() => {
    if (type === 'reference' && reference && !isNumber(reference.value)) {
      return passedLabel && passedLabel !== '' ? passedLabel : reference.value.title;
    }

    return passedLabel;
  }, [passedLabel, type, reference]);

  const url = useMemo(() => {
    let nextUrl = passedUrl || '/';

    if (type === 'reference' && reference && !isNumber(reference.value)) {
      nextUrl = reference.value.url || '/';
    }

    return nextUrl;
  }, [passedUrl, type, reference]);

  if (type === 'reference') {
    return (
      <NextLink href={url} className={className}>
        {label}
      </NextLink>
    );
  }

  return (
    <a href={url} className={className}>
      {label}
    </a>
  );
};

export default Link;
