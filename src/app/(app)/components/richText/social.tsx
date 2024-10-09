'use client';

import { FacebookEmbed, InstagramEmbed } from 'react-social-media-embed';

import { SerializedLexicalNode } from './types';

const Social = (content: SerializedLexicalNode) => {
  if (content.fields?.type === 'instagram') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <InstagramEmbed url={content.fields.url} width={content.fields.width || 328} />
      </div>
    );
  }

  return null;
};

export default Social;
