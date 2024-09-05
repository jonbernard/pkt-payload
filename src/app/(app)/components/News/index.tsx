import { PaginatedDocs } from 'payload';
import { isNumber } from 'lodash';

import Image from 'next/image';
import Link from 'next/link';

import { Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { Post } from '@payload-types';

const News = async ({ posts, title = true }: { posts: Post[]; title?: boolean }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="news" className="dark:bg-gray-dark bg-white">
      <Container maxWidth="md" className="py-12">
        {title && (
          <div className="wow fadeInUp mx-auto max-w-[800px]" data-wow-delay=".2s">
            <h1 className="mb-5 text-md font-bold text-center leading-tight text-black dark:text-white sm:text-lg sm:leading-tight md:text-3xl md:leading-tight">
              News and Happenings
            </h1>
          </div>
        )}
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid xs={12} sm={6} md={4} className="wow fadeInUp" data-wow-delay=".2s" key={post.slug}>
              <Link href={`/news/${post.slug}`}>
                <Card>
                  {!isNumber(post.image) && post.image?.url ? (
                    <CardMedia sx={{ height: 175 }} image={post.image.url} title={post.image.text || 'Image'} />
                  ) : (
                    <Box className="grid place-items-center bg-gray-100 dark:bg-transparent" sx={{ height: 175 }}>
                      <Image
                        src="/coa.png"
                        alt="coa"
                        width={100}
                        height={100}
                        className="animate-in fade-in duration-700 grayscale opacity-10 dark:opacity-30"
                      />
                    </Box>
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                    {post.description && (
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {post.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default News;
