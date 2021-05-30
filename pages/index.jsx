import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import {
  ArticleCard,
  Layout,
} from '../src/components';
import { useIsMobile } from '../src/hooks';
import { getAllArticles } from '../src/lib/article';

function BlogReel({ articles }) {
  const isMobile = useIsMobile();
  const getFullSize = (i) => (i === 0 ? 'md' : 'sm');
  return (
    <Grid
      container
      spacing={isMobile ? 2 : 6}
    >
      {
        articles.map((article, i) => (
          <Grid
            item
            xs={(i === 0 || isMobile) ? 12 : 6}
            key={article.slug}
          >
            <ArticleCard
              article={article}
              size={isMobile ? 'xs' : getFullSize(i)}
              isPrioritized={i < 3}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}

BlogReel.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function Index({ articles }) {
  const isMobile = useIsMobile();
  return (
    <Layout
      title="Computers and stuff, made simple"
      description="An educational blog about math, computers, cybersecurity, and web development."
      allArticles={articles}
    >
      <Container
        maxWidth={isMobile ? 'xs' : 'md'}
        component="main"
      >
        <Box mb={isMobile ? 2 : 5}>
          <BlogReel articles={articles} />
        </Box>
      </Container>
    </Layout>
  );
}

Index.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getStaticProps() {
  const articles = await getAllArticles();
  return {
    props: {
      articles,
    },
  };
}
