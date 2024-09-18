import React from 'react';

import classNames from 'classnames';

import { Container } from '@mui/material';

import BlockContent from './block';
import DefaultComponent from './default';
import FileComponent from './file';
import HorizontalRule from './horizontalRule';
import Image from './image';
import Paragraph from './paragraph';
import Quote from './quote';
import Relationship from './relationship';
import { SerializedLexicalNode } from './types';

const smallSizeTypes = ['relationship', 'upload'];

const blockClasses: Record<string, boolean> = {
  'block-paymentLinkBlock-fullscreen': true,
};

const Content = ({
  data,
  excludeContainer,
}: {
  data: SerializedLexicalNode;
  excludeContainer?: boolean;
}) => {
  const render = () => {
    if (data.type === 'paragraph') return <Paragraph {...data} />;
    if (data.type === 'block') return <BlockContent {...data} />;
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
      data.type === 'upload' &&
      data.relationTo === 'media' &&
      data.value?.mimeType?.includes('image')
    ) {
      return <Image {...data} />; // eslint-disable-line jsx-a11y/alt-text
    }

    if (['heading', 'list'].includes(data.type)) return <DefaultComponent {...data} />;

    return <span>Content unavailable</span>;
  };

  const blockClass = blockClasses[`${data?.type}-${data?.fields?.blockType}-${data?.fields?.type}`];

  if (excludeContainer || blockClass) return render();

  return (
    <Container
      maxWidth={smallSizeTypes.includes(data.type) ? 'sm' : 'lg'}
      className={classNames(
        'clear-both',
        data.type === 'heading' ? `heading-${data.tag}` : '',
        blockClasses[`${data?.type}-${data?.fields?.blockType}-${data?.fields?.type}`],
      )}
      sx={{ lineHeight: 1.8 }}
      data-blocktype={data.type}
    >
      {render()}
    </Container>
  );
};

export default Content;
