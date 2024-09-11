import { serialize } from './utils';
import { SerializedLexicalNode } from './types';

const DefaultComponent = (content: SerializedLexicalNode) => {
  return <div dangerouslySetInnerHTML={{ __html: serialize([content]) }} />;
};

export default DefaultComponent;
