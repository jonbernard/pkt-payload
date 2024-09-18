import classNames from 'classnames';
import Link from 'next/link';

import { Button, Card, CardContent, Stack } from '@mui/material';

import { SerializedLexicalNode } from './types';

const PaymentLinkBlock = (content: SerializedLexicalNode) => {
  console.log('JB | PaymentLinkBlock | content:', content);
  const renderInline = (direction: 'row' | 'column' = 'row', invertColor = false) => {
    const defaultLabel = content.fields.paymentLink.submitType;

    return (
      <Stack
        alignItems={direction === 'row' ? 'center' : 'stretch'}
        justifyContent="center"
        spacing={direction === 'row' ? 6 : 3}
        direction={direction}
        className={classNames('mx-auto text-center', direction === 'row' ? 'max-w-[800px]' : '')}
      >
        <div className="space-y-6">
          {content.fields.text && (
            <h1 className="text-sm font-bold leading-tight text-black dark:text-white sm:text-md sm:leading-tight md:text-xl md:leading-tight">
              {content.fields.text}
            </h1>
          )}
          {content.fields.description && <div>{content.fields.description}</div>}
        </div>
        <Button
          LinkComponent={Link}
          href={content.fields.paymentLink.paymentLinkUrl}
          variant="contained"
          className={classNames(
            'whitespace-nowrap shrink-0',
            invertColor ? 'bg-white text-primary' : '',
          )}
        >
          {content.fields.linkText ||
            `${defaultLabel.charAt(0).toUpperCase()}${defaultLabel.slice(1)}`}
        </Button>
      </Stack>
    );
  };

  if (content.fields.type === 'fullscreen') {
    return (
      <section className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-8">
        {renderInline()}
      </section>
    );
  }

  if (content.fields.type === 'inlineCentered') return renderInline();

  if (content.fields.type === 'card')
    return (
      <Card className={content.fields.color === 'red' ? 'bg-primary' : ''}>
        <CardContent>{renderInline('column', content.fields.color !== 'default')}</CardContent>
      </Card>
    );

  return null;
};

export default PaymentLinkBlock;
