import { Container } from '@mui/material';

import { serialize } from './utils';
import { SerializedLexicalNode } from './types';

const DefaultComponent = (content: SerializedLexicalNode) => {
  return <Container maxWidth="lg" dangerouslySetInnerHTML={{ __html: serialize([content]) }} />;
};

export default DefaultComponent;
