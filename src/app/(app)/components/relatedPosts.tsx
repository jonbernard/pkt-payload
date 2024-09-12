import { isNumber } from 'lodash';
import Link from 'next/link';

import { Container, Typography } from '@mui/material';

import { Post } from '@payload-types';

type Props = {
  posts?: Post['relatedLinks'];
};

const RelatedPosts = ({ posts }: Props) => {
  if (!posts || posts.length === 0) return null;

  return (
    <Container maxWidth="lg" className="space-y-2">
      <Typography variant="h4">Related Posts</Typography>
      <ul>
        {posts?.map(
          ({ reference }) =>
            reference?.value &&
            !isNumber(reference?.value) && (
              <li key={reference?.value?.title}>
                <Link href={reference?.value.url || '/'}>{reference?.value.title}</Link>
              </li>
            ),
        )}
      </ul>
    </Container>
  );
};

export default RelatedPosts;
