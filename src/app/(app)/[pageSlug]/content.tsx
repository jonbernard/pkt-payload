import Hero from '@/components/hero';
import { SerializedLexicalNode } from '@/components/richText/types';
import ContentComponent from '@/components/richText';
import { DataFromCollectionSlug } from 'payload';

type Props = DataFromCollectionSlug<'pages'> & {
  body?: SerializedLexicalNode[];
};

const Content = ({ body, description, relatedLinks, title }: Props) => {
  return (
    <main>
      <article>
        <Hero title={title} description={description!} related={relatedLinks} linkStyle="link" />

        <section id="content" className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-6">
          {body?.map((node, index) => (
            <ContentComponent key={index} data={node} />
          ))}
        </section>
      </article>
    </main>
  );
};

export default Content;
