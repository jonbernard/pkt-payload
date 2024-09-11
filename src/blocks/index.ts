import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical';

import { Banner } from '@/blocks/Banner';
import { Code } from '@/blocks/Code';
import { MediaBlock } from '@/blocks/MediaBlock';
import { Content } from '@/blocks/Content';
import { Video } from '@/blocks/Video';

export const editor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      BlocksFeature({ blocks: [Content, Banner, Code, MediaBlock, Video] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
    ];
  },
});
