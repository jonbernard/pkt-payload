// import { Button } from '@mui/material';
import { Container, Typography } from '@mui/material';
import { Page, Post } from '@payload-types';
import { isNumber } from 'lodash';
import Link from 'next/link';

type Props = {
  posts?: Post['related'];
};

const RelatedPosts = ({ posts }: Props) => {
  if (!posts || posts.length === 0) return null;

  return (
    <Container maxWidth="lg" className="space-y-2">
      <Typography variant="h4">Related Posts</Typography>
      <ul>
        {posts?.map(
          ({ value: post }) =>
            !isNumber(post) && (
              <li key={post?.title}>
                <Link href={`/news/${post.slug}`}>{post.title}</Link>
              </li>
            ),
        )}
      </ul>
    </Container>
  );
};

export default RelatedPosts;
