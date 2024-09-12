'use client';

import { SerializedLexicalNode } from './types';

const Payments = (content: SerializedLexicalNode) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
      <stripe-buy-button
      buy-button-id="${content.fields.embed || content.fields.customId}"
      publishable-key="${process.env.NEXT_PUBLIC_STRIPE_KEY}"
    ></stripe-buy-button>
      `,
      }}
    />
  );
};

export default Payments;
