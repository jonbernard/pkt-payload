import { useMemo } from 'react';

import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

import { Stack, Typography } from '@mui/material';

import { SerializedLexicalNode } from './types';

const FileComponent = (content: SerializedLexicalNode) => {
  const name = useMemo(() => content?.value?.text || 'File', [content?.value?.text]);
  const extension = useMemo(
    (): DefaultExtensionType => content?.value?.url.split('.').pop(),
    [content?.value?.url],
  );

  return (
    <Stack
      component="a"
      href={content?.value?.url}
      direction="row"
      alignItems="center"
      spacing={2}
      className="w-full overflow-hidden rounded-lg border-[1px] border-body-color/50 dark:border-body-color/40"
    >
      <div className="w-12 p-6 bg-body-color/50 box-content">
        <FileIcon extension={extension} {...defaultStyles[extension]} />
      </div>
      <Stack>
        <Typography variant="caption">File</Typography>
        <Typography variant="h4">{name}</Typography>
      </Stack>
    </Stack>
  );
};

export default FileComponent;
