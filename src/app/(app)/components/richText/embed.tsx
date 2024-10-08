import { Box } from '@mui/material';

import { SerializedLexicalNode } from './types';

const Embed = (content: SerializedLexicalNode) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: content.fields.code }}
      sx={{ iframe: { width: '100% !important', maxWidth: 'none !important' } }}
    />
  );
};

export default Embed;
