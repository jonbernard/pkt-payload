import { Alert } from '@mui/material';
import { serialize } from './utils';
import { SerializedLexicalNode } from './types';

const Banner = (content: SerializedLexicalNode) => {
  return (
    <Alert severity={content.fields.style} classes={{ message: 'pt-1' }}>
      <div dangerouslySetInnerHTML={{ __html: serialize([content.fields.content.root]) }} />
    </Alert>
  );
};

export default Banner;
