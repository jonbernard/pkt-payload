import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { MediaBlock } from '../MediaBlock';
import { PaymentLinkBlocks } from '../PaymentLink';
import { Video } from '../Video';

export const editorFeatures = (includeMedia = true) => [
  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
  BlocksFeature({
    blocks: [PaymentLinkBlocks, ...(includeMedia ? [MediaBlock] : []), Video],
  }),
  FixedToolbarFeature(),
  InlineToolbarFeature(),
];
