import React from 'react';

import dynamic from 'next/dynamic';

import Banner from './banner';
import ContentBlock from './content';
import Embed from './embed';
import Image from './image';
import LinkList from './linkList';
import PaymentLinkBlock from './paymentLinkBlock';
import Payments from './payments';
import { SerializedLexicalNode } from './types';
import Video from './video';

const Social = dynamic(() => import('./social'), { ssr: false });

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
  if (props.fields.blockType === 'embed') return <Embed {...props} />;
  if (props.fields.blockType === 'social') return <Social {...props} />;
  if (props.fields.blockType === 'linkList') return <LinkList {...props} />;
  if (props.fields.blockType === 'payments') return <Payments {...props} />;

  return <span data-blocktype={props.fields.blockType}>Block content unavailable</span>;
};

export default BlockContent;
