'use client';

import { isNumber } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { Post } from '@payload-types';

import FadeOnVisible from '../fadeOnVisible';

const NewsCard = ({ post }: { post: Post }) => {
  return (
    <Grid xs={12} sm={6} md={4} key={post.slug}>
      <Link href={`/news/${post.slug}`}>
        <FadeOnVisible>
          <Card>
            {!isNumber(post.image) && post.image?.url ? (
              <CardMedia
                sx={{ height: 175 }}
                image={post.image.url}
                title={post.image.text || 'Image'}
              />
            ) : (
              <Box
                className="grid place-items-center bg-gray-100 dark:bg-transparent"
                sx={{ height: 175 }}
              >
                <Image
                  src="/coa.png"
                  alt="coa"
                  width={100}
                  height={100}
                  className="grayscale opacity-10 dark:opacity-30"
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
        </FadeOnVisible>
      </Link>
    </Grid>
  );
};

export default NewsCard;
