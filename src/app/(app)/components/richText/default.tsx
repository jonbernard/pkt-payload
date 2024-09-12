import { SerializedLexicalNode } from './types';
import { serialize } from './utils';

const DefaultComponent = (content: SerializedLexicalNode) => {
  return <div dangerouslySetInnerHTML={{ __html: serialize([content]) }} />;
};

export default DefaultComponent;
