import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical';

import { LinkList } from '../LinkList';
import { MediaBlock } from '../MediaBlock';
import { PaymentLinkBlocks } from '../PaymentLink';
import { Video } from '../Video';

export const editorFeatures = (includeMedia = true) => [
  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
  BlocksFeature({
    blocks: [LinkList, PaymentLinkBlocks, ...(includeMedia ? [MediaBlock] : []), Video],
  }),
  FixedToolbarFeature(),
  InlineToolbarFeature(),
];
