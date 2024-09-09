'use client';

import { useMemo, useState } from 'react';
import { Container } from '@mui/material';
import Image from 'next/image';
import useElementSize from '@/hooks/useElementSize';
import { SerializedLexicalNode } from './types';
import classNames from 'classnames';

const ImageComponent = (content: SerializedLexicalNode) => {
  const [ratio, setRatio] = useState(16 / 9);
  const [elemSize, elemRef] = useElementSize();

  const scale = content?.fields?.position === 'centered' ? 0.5 : 1;

  const url = useMemo(() => content.fields?.media?.url || content.value?.url, [content.fields?.media?.url, content.value?.url]);
  const text = useMemo(() => content.fields?.media?.text || content.value?.text || 'Image', [content.fields?.media?.text, content.value?.text]);

  if (!url || !text) return null;

  if (content?.fields?.position === 'fullscreen') {
    return (
      <div ref={elemRef} className="relative w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? '' : process.env.NEXT_PUBLIC_SERVER_URL}${url}`}
          alt={text}
          width={elemSize.width}
          height={elemSize.width * ratio}
          layout="responsive"
          onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
        />
      </div>
    );
  }

  return (
    <Container
      component="div"
      ref={elemRef}
      maxWidth="lg"
      className={classNames('relative', {
        'flex justify-center': content?.fields?.position === 'centered',
      })}
    >
      <Image
        src={url}
        alt={text}
        width={elemSize.width * scale}
        height={elemSize.width * scale * ratio}
        layout={content?.fields?.position !== 'centered' ? 'responsive' : undefined}
        onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
      />
    </Container>
  );
};

export default ImageComponent;
