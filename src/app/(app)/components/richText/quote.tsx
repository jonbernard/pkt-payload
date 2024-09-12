import { SerializedLexicalNode } from './types';
import { serialize } from './utils';

const Quote = (content: SerializedLexicalNode) => {
  return (
    <div
      className="border-l-4 pl-6 ml-8 border-primary dark:border-yellow"
      dangerouslySetInnerHTML={{ __html: serialize([content]) }}
    />
  );
};

export default Quote;
