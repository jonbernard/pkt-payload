import React from 'react';

import Banner from './banner';
import ContentBlock from './content';
import Image from './image';
import PaymentLinkBlock from './paymentLinkBlock';
import Payments from './payments';
import { SerializedLexicalNode } from './types';
import Video from './video';

const BlockContent = (props: SerializedLexicalNode) => {
  if (props.fields.blockType === 'banner') return <Banner {...props} />;
  if (props.fields.blockType === 'paymentLinkBlock') return <PaymentLinkBlock {...props} />;
  if (
    props.fields?.blockType === 'mediaBlock' &&
    props.fields?.media?.mimeType?.includes('image')
  ) {
    return <Image {...props} />; // eslint-disable-line jsx-a11y/alt-text
  }
  if (props.fields.blockType === 'content') return <ContentBlock {...props} />;
  if (props.fields.blockType === 'video') return <Video {...props} />;
  if (props.fields.blockType === 'payments') return <Payments {...props} />;

  return <span data-blocktype={props.fields.blockType}>Block content unavailable</span>;
};

export default BlockContent;
