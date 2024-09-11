import { SerializedLexicalNode } from './types';
import Content from '.';
import { Stack } from '@mui/material';

const ContentBlock = (content: SerializedLexicalNode) => {
  return (
    <Stack direction="row" spacing={4} alignItems={content.fields.align}>
      {content.fields.columns?.map((column: any) => {
        return (
          <div key={column.id} className={column.size}>
            {column.richText?.root?.children &&
              column.richText?.root?.children.map(
                (content: any, index: number) => content && <Content key={index} data={content} excludeContainer />,
              )}
          </div>
        );
      })}
    </Stack>
  );
};

export default ContentBlock;
