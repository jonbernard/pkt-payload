import { Box, Container } from '@mui/material';
import classNames from 'classnames';

import { serialize } from './utils';
import { SerializedLexicalNode } from './types';

const style: Record<string, string> = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
  justify: 'text-justify',
};

const Paragraph = (content: SerializedLexicalNode) => {
  const indent = content.indent ? (typeof content.indent === 'number' ? content.indent : parseInt(content.indent, 10)) : 0;

  if (indent > 0) {
    return (
      <Container maxWidth="lg">
        <Box className={style[content.format] || ''} sx={{ paddingLeft: indent * 8 }} dangerouslySetInnerHTML={{ __html: serialize([content]) }} />
      </Container>
    );
  }

  return <Container className={style[content.format] || ''} maxWidth="lg" dangerouslySetInnerHTML={{ __html: serialize([content]) }} />;
};

export default Paragraph;
