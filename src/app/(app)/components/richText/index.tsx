import { Container } from '@mui/material';

import React from 'react';
import Paragraph from './paragraph';
import { SerializedLexicalNode } from './types';
import Banner from './banner';
import HorizontalRule from './horizontalRule';
import Image from './image';
import DefaultComponent from './default';
import Relationship from './relationship';
import Quote from './quote';
import FileComponent from './file';
import ContentBlock from './content';
import Video from './video';

const smallSizeTypes = ['relationship', 'upload'];

const Content = ({ data, excludeContainer }: { data: SerializedLexicalNode; excludeContainer?: boolean }) => {
  const render = () => {
    if (data.type === 'paragraph') return <Paragraph {...data} />;
    if (data.type === 'block' && data.fields.blockType === 'banner') return <Banner {...data} />;
    if (data.type === 'horizontalrule') return <HorizontalRule {...data} />;
    if (data.type === 'relationship') return <Relationship {...data} />;
    if (data.type === 'quote') return <Quote {...data} />;
    if (data.type === 'upload' && data.relationTo === 'media' && ['application/pdf'].includes(data.value?.mimeType))
      return <FileComponent {...data} />;

    if (
      (data.type === 'block' && data.fields?.blockType === 'mediaBlock' && data.fields?.media?.mimeType?.includes('image')) ||
      (data.type === 'upload' && data.relationTo === 'media' && data.value?.mimeType?.includes('image'))
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
