'use client';

import { useMemo, useState } from 'react';
import { Container } from '@mui/material';
import Image from 'next/image';
import useElementSize from '@/hooks/useElementSize';
import { SerializedLexicalNode } from './types';

const ImageComponent = (content: SerializedLexicalNode) => {
  const [ratio, setRatio] = useState(16 / 9);
  const [elemSize, elemRef] = useElementSize();

  const url = useMemo(() => content.fields?.media?.url || content.value?.url, [content.fields?.media?.url, content.value?.url]);
  const text = useMemo(() => content.fields?.media?.text || content.value?.text || 'Image', [content.fields?.media?.text, content.value?.text]);

  if (!url || !text) return null;

  if (content?.fields?.position === 'fullscreen') {
    return (
      <div ref={elemRef} className="relative w-full">
        <Image
          src={url}
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
    <Container component="div" ref={elemRef} maxWidth="lg" className="relative">
      <Image
        src={url}
        alt={text}
        width={elemSize.width}
        height={elemSize.width * ratio}
        layout="responsive"
        onLoadingComplete={({ naturalWidth, naturalHeight }) => setRatio(naturalWidth / naturalHeight)}
      />
    </Container>
  );
};

export default ImageComponent;
