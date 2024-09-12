import { Box } from '@mui/material';

import { SerializedLexicalNode } from './types';
import { serialize } from './utils';

const style: Record<string, string> = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
  justify: 'text-justify',
};

const Paragraph = (content: SerializedLexicalNode) => {
  const indent = content.indent
    ? typeof content.indent === 'number'
      ? content.indent
      : parseInt(content.indent, 10)
    : 0;

  if (indent > 0) {
    return (
      <Box
        className={style[content.format] || ''}
        sx={{ paddingLeft: indent * 8 }}
        dangerouslySetInnerHTML={{ __html: serialize([content]) }}
      />
    );
  }

  return (
    <div
      className={style[content.format] || ''}
      dangerouslySetInnerHTML={{ __html: serialize([content]) }}
    />
  );
};

export default Paragraph;
