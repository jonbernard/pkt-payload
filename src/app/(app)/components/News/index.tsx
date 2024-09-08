import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { Post } from '@payload-types';

import NewsCard from './card';

const News = async ({ posts, title = true }: { posts: Post[]; title?: boolean }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="news" className="dark:bg-gray-dark bg-white">
      <Container maxWidth="md" className="py-12">
        {title && (
          <div className="mx-auto max-w-[800px]">
            <h1 className="mb-8 text-md font-bold text-center leading-tight text-black dark:text-white sm:text-lg sm:leading-tight md:text-3xl md:leading-tight">
              News and Happenings
            </h1>
          </div>
        )}
        <Grid container spacing={4}>
          {posts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default News;
