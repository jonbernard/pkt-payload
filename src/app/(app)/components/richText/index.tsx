import React from 'react';

import { Container } from '@mui/material';

import Banner from './banner';
import ContentBlock from './content';
import DefaultComponent from './default';
import FileComponent from './file';
import HorizontalRule from './horizontalRule';
import Image from './image';
import Paragraph from './paragraph';
import Quote from './quote';
import Relationship from './relationship';
import { SerializedLexicalNode } from './types';
import Video from './video';

const smallSizeTypes = ['relationship', 'upload'];

const Content = ({
  data,
  excludeContainer,
}: {
  data: SerializedLexicalNode;
  excludeContainer?: boolean;
}) => {
  const render = () => {
    if (data.type === 'paragraph') return <Paragraph {...data} />;
    if (data.type === 'block' && data.fields.blockType === 'banner') return <Banner {...data} />;
    if (data.type === 'horizontalrule') return <HorizontalRule {...data} />;
    if (data.type === 'relationship') return <Relationship {...data} />;
    if (data.type === 'quote') return <Quote {...data} />;
    if (
      data.type === 'upload' &&
      data.relationTo === 'media' &&
      ['application/pdf'].includes(data.value?.mimeType)
    )
      return <FileComponent {...data} />;

    if (
      (data.type === 'block' &&
        data.fields?.blockType === 'mediaBlock' &&
        data.fields?.media?.mimeType?.includes('image')) ||
      (data.type === 'upload' &&
        data.relationTo === 'media' &&
        data.value?.mimeType?.includes('image'))
    ) {
      return <Image {...data} />; // eslint-disable-line jsx-a11y/alt-text
    }
    if (data.type === 'block' && data.fields.blockType === 'content') {
      return <ContentBlock {...data} />; // eslint-disable-line jsx-a11y/alt-text
    }
    if (data.type === 'block' && data.fields.blockType === 'video') {
      return <Video {...data} />; // eslint-disable-line jsx-a11y/alt-text
    }

    if (['heading', 'list'].includes(data.type)) return <DefaultComponent {...data} />;

    return <span>Content unavailable</span>;
  };

  if (excludeContainer) return render();

  return (
    <Container
      maxWidth={smallSizeTypes.includes(data.type) ? 'sm' : 'lg'}
      className={data.type === 'heading' ? `heading-${data.tag}` : ''}
      data-blocktype={data.type}
    >
      {render()}
    </Container>
  );
};

export default Content;
