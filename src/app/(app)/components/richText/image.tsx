/* eslint-disable @next/next/no-img-element */
'use client';

import { useMemo } from 'react';

import classNames from 'classnames';

import { Box } from '@mui/material';

import { SerializedLexicalNode } from './types';

/* eslint-disable @next/next/no-img-element */

const ImageComponent = (content: SerializedLexicalNode) => {
  const url = useMemo(() => {
    if (content?.fields?.position === 'centered' && content.fields?.media?.sizes?.tablet?.url)
      return content.fields.media.sizes.tablet.url;

    if (content?.fields?.position !== 'centered' && content.fields?.media?.sizes?.desktop?.url)
      return content.fields.media.sizes.desktop.url;

    if (content.value?.url) return content.value?.url;

    return content.fields?.media?.url;
  }, [
    content?.fields?.position,
    content.fields?.media?.url,
    content.fields?.media?.sizes,
    content.value?.url,
  ]);

  const text = useMemo(
    () => content.fields?.media?.text || content.value?.text || 'Image',
    [content.fields?.media?.text, content.value?.text],
  );

  if (!url || !text) return null;

  if (content?.fields?.position === 'fullscreen') {
    return (
      <div className="relative w-full">
        <img
          src={`${
            process.env.NEXT_PUBLIC_NODE_ENV === 'development'
              ? ''
              : process.env.NEXT_PUBLIC_SERVER_URL
          }${url}`}
          alt={text}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <Box
      className={classNames('relative', {
        'flex justify-center': content?.fields?.position === 'centered',
      })}
      sx={{}}
    >
      <img
        src={url}
        alt={text}
        className={content?.fields?.position === 'centered' ? 'w-1/2' : 'w-full'}
      />
    </Box>
  );
};

export default ImageComponent;
