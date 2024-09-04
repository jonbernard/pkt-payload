import { Container } from '@mui/material';

import { serialize } from './utils';
import { SerializedLexicalNode } from './types';

const Quote = (content: SerializedLexicalNode) => {
  return (
    <Container maxWidth="lg">
      <div className="border-l-4 pl-6 ml-8 border-primary dark:border-yellow" dangerouslySetInnerHTML={{ __html: serialize([content]) }} />
    </Container>
  );
};

export default Quote;
