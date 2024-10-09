import Link from 'next/link';

import { ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

import { SerializedLexicalNode } from './types';

const LinkList = (content: SerializedLexicalNode) => {
  return (
    <Box className="inline-block">
      {content.fields?.links?.map((link: { url: string; label: string }) => (
        <Stack
          component={Link}
          key={link.url}
          href={link.url}
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={6}
          className="disableLinkStyles border-b border-solid border-gray-300 dark:border-gray-700"
        >
          <h2>{link.label}</h2>
          <ArrowForwardIosIcon />
        </Stack>
      ))}
    </Box>
  );
};

export default LinkList;
