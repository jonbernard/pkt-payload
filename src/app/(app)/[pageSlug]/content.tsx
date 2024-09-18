import { DataFromCollectionSlug } from 'payload';

import Hero from '@/components/hero';
import { SerializedLexicalNode } from '@/components/richText/types';

import { renderPageBody } from './utils';

type Props = DataFromCollectionSlug<'pages'> & {
  body?: SerializedLexicalNode[];
};

const Content = ({ body, description, relatedLinks, title }: Props) => {
  return (
    <main>
      <article>
        <Hero title={title} description={description!} related={relatedLinks} linkStyle="link" />

        {renderPageBody(body)}
      </article>
    </main>
  );
};

export default Content;
