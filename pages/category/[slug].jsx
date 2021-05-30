import PropTypes from 'prop-types';
import {
  Box,
  capitalize,
  Container,
  Grid,
} from '@material-ui/core';
import { ArticleCard, Layout } from '../../src/components';
import { categories, slugify, unslugify } from '../../src/lib/category';
import { getAllArticles } from '../../src/lib/article';
import { useIsMobile } from '../../src/hooks';

export default function Category({ allArticles, category }) {
  const isMobile = useIsMobile();
  const articles = allArticles.filter((article) => article.category === category);
  return (
    <Layout
      title={`Articles about ${capitalize(category)}`}
      description={`Browse all our articles in the ${capitalize(category)} category.`}
      allArticles={allArticles}
    >
      <Container
        maxWidth={isMobile ? 'xs' : 'md'}
        component="main"
      >
        <Box
          pb={5}
          component={Grid}
          container
          spacing={3}
        >
          {
            articles.map(
              (article, i) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={article.title}
                >
                  <ArticleCard
                    article={article}
                    size={isMobile ? 'xs' : 'sm'}
                    isPrioritized={i < 4}
                  />
                </Grid>
              ),
            )
          }
        </Box>
      </Container>
    </Layout>
  );
}

Category.propTypes = {
  allArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
};

export async function getStaticProps({ params }) {
  const allArticles = await getAllArticles();
  const category = unslugify(params.slug);
  return {
    props: {
      allArticles,
      category,
    },
  };
}

export function getStaticPaths() {
  return {
    paths: categories
      .map(slugify)
      .map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
