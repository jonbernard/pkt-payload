'use client';

import copy from 'copy-to-clipboard';

import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

const CopyButton: React.FC = (a) => {
  return (
    <Tooltip title="Copy input">
      <IconButton
        size="small"
        onClick={(e) => {
          const input = (e.target as EventTarget & HTMLButtonElement).parentElement?.parentElement
            ?.firstChild as EventTarget & HTMLButtonElement;
          copy(input?.value || '');
        }}
      >
        <ContentCopyIcon
          sx={[
            (theme) => ({
              '[data-theme="dark"] &': {
                color: '#fff',
              },
            }),
          ]}
        />
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
