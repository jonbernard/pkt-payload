import Image from 'next/image';
import { useMemo } from 'react';

import { Stack, Typography } from '@mui/material';

import { SerializedLexicalNode } from './types';

const Relationship = (content: SerializedLexicalNode) => {
  const name = useMemo(
    () => content?.value?.name || content?.value?.member?.fullNamePreferred || content?.value?.fullNamePreferred || 'Member',
    [content?.value?.fullNamePreferred, content?.value?.member?.fullNamePreferred, content?.value?.name],
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      className="w-full overflow-hidden rounded-lg border-[1px] border-body-color/50 dark:border-body-color/40"
    >
      {content?.value?.image?.url && <Image src={content.value.image.url} alt={content.value.image.text || 'Image'} width={150} height={150} />}
      <Stack>
        <Typography variant="caption">Member</Typography>
        <Typography variant="h2">{name}</Typography>
      </Stack>
    </Stack>
  );
};

export default Relationship;
