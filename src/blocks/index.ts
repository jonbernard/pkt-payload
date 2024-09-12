import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { Banner } from '@/blocks/Banner';
import { Code } from '@/blocks/Code';
import { Content } from '@/blocks/Content';
import { MediaBlock } from '@/blocks/MediaBlock';
import { Video } from '@/blocks/Video';

import { Payments } from './Payments';

export const editor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      BlocksFeature({ blocks: [Content, Banner, Code, MediaBlock, Video, Payments] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
    ];
  },
});
