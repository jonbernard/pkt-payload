import { SerializedLexicalNode } from './types';
import { Container, Divider } from '@mui/material';

const HorizontalRule = (content: SerializedLexicalNode) => {
  return (
    <Container maxWidth="lg">
      <Divider />
    </Container>
  );
};

export default HorizontalRule;
