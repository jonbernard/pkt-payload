import classNames from 'classnames';

import { Stack } from '@mui/material';

import Content from '.';
import { SerializedLexicalNode } from './types';

const ContentBlock = (content: SerializedLexicalNode) => {
  return (
    <Stack direction="row" spacing={4} alignItems={content.fields.align}>
      {content.fields.columns?.map((column: any) => {
        return (
          <div key={column.id} className={classNames(column.size, 'space-y-6')}>
            {column.richText?.root?.children &&
              column.richText?.root?.children.map(
                (content: any, index: number) =>
                  content && <Content key={index} data={content} excludeContainer />,
              )}
          </div>
        );
      })}
    </Stack>
  );
};

export default ContentBlock;
