import ContentComponent from '@/components/richText';
import { SerializedLexicalNode } from '@/components/richText/types';

export const renderPageBody = (body?: SerializedLexicalNode[]) => {
  if (
    body &&
    body[0] &&
    body[0].type === 'block' &&
    body[0].fields.blockType === 'paymentLinkBlock' &&
    body[0].fields.type === 'fullscreen'
  ) {
    return (
      <>
        <ContentComponent data={body[0]} />
        {[...body.slice(1)].length > 0 && (
          <section
            id="content"
            className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-8"
          >
            {[...body.slice(1)]?.map((node, index) => (
              <ContentComponent key={index} data={node} />
            ))}
          </section>
        )}
      </>
    );
  }

  if (body && body.length > 0) {
    return (
      <section
        id="content"
        className="dark:bg-gray-800 bg-gray-50 py-12 border-y border-solid border-gray-300 dark:border-gray-700 space-y-8"
      >
        {body?.map((node, index) => (
          <ContentComponent key={index} data={node} />
        ))}
      </section>
    );
  }

  return null;
};
