import { useContext } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Head from 'next/head';
import {
  Box,
  capitalize,
  Chip,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ArticleCard, Layout, Link as MuiLink } from '../../src/components';
import { getAllArticles, getArticle } from '../../src/lib/article';
import { useIsMobile } from '../../src/hooks';
import { SearchContext } from '../_app';

const useStyles = makeStyles({
  faded: {
    opacity: 0.75,
  },
});

const sortByDateAsc = (a, b) => Date.parse(b.date) - Date.parse(a.date);

function getNextArticle(date, articles) {
  return articles
    .filter((article) => Date.parse(article.date) > Date.parse(date))
    .sort(sortByDateAsc)
    .slice(-1)[0];
}

function getPreviousArticle(date, articles) {
  return articles
    .filter((article) => Date.parse(article.date) < Date.parse(date))
    .sort(sortByDateAsc)[0];
}

function CategoryLink({ article, text }) {
  return (
    <Typography align="center">
      {`${text} in `}
      <MuiLink
        href={article.categoryUrl}
        prefetch={false}
      >
        {article.category}
      </MuiLink>
      :
    </Typography>
  );
}

CategoryLink.propTypes = {
  article: PropTypes.objectOf(PropTypes.any).isRequired,
  text: PropTypes.string.isRequired,
};

export default function Article({
  allArticles,
  article,
  nextArticle,
  previousArticle,
}) {
  const isMobile = useIsMobile();
  const classes = useStyles();
  const { setFilters } = useContext(SearchContext);
  const filterBySeries = ({ series }) => series === article.series;
  const series = !article.series ? null : {
    index: allArticles.find(({ slug }) => slug === article.series),
    next: getNextArticle(article.date, allArticles.filter(filterBySeries)) || null,
    previous: getPreviousArticle(article.date, allArticles.filter(filterBySeries)) || null,
  };
  return (
    <Layout
      title={article.title}
      description={article.description}
      allArticles={allArticles}
      image={article.image}
    >
      <Head>
        {/* https://web.dev/defer-non-critical-css/ */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" />
        </noscript>
      </Head>
      <Box
        position="relative"
        height={isMobile ? 80 : 360}
        mb={5}
      >
        <Image
          className={classes.faded}
          src={article.image}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </Box>
      <Container maxWidth={isMobile ? 'xs' : 'md'}>
        <Box mb={isMobile ? 2 : 8}>
          <main>
            <ArticleCard
              article={article}
              series={series}
              size={isMobile ? 'xs' : 'lg'}
              isFullLength
            />
          </main>
          {
            !article.tags.length ? undefined : (
              <Box
                mt={2}
                mb={5}
                component="section"
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h1"
                >
                  Tags
                </Typography>
                {
                  article.tags.map((tag) => (
                    <Chip
                      // The tag-filter class tells the searchbar's ClickAwayListener to ignore this
                      className="tag-filter"
                      key={tag}
                      label={capitalize(tag)}
                      clickable
                      variant="outlined"
                      // Update the searchbar using the global SearchContext
                      onClick={() => setFilters([tag])}
                    />
                  ))
                }
              </Box>
            )
          }
        </Box>
        <Box
          component={Grid}
          container
          spacing={isMobile ? 2 : 3}
          pb={5}
          direction={isMobile ? 'row-reverse' : 'row'}
        >
          <Grid item xs={12}>
            <CategoryLink
              article={article}
              text={isMobile ? 'Next article' : 'More articles'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {
              previousArticle && (
                <ArticleCard
                  article={previousArticle}
                  size="xs"
                />
              )
            }
          </Grid>
          {
            isMobile && (
              <Grid item xs={12}>
                <CategoryLink
                  article={article}
                  text="Previous article"
                />
              </Grid>
            )
          }
          <Grid item xs={12} sm={6}>
            {
              nextArticle && (
                <ArticleCard
                  article={nextArticle}
                  size="xs"
                />
              )
            }
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
}

Article.propTypes = {
  allArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  article: PropTypes.objectOf(PropTypes.any).isRequired,
  nextArticle: PropTypes.objectOf(PropTypes.any),
  previousArticle: PropTypes.objectOf(PropTypes.any),
};

Article.defaultProps = {
  nextArticle: null,
  previousArticle: null,
};

export async function getStaticProps({ params }) {
  const allArticles = await getAllArticles();
  const article = await getArticle(params.slug);
  const articlesInCategory = allArticles.filter(({ category }) => category === article.category);

  return {
    props: {
      allArticles,
      article,
      nextArticle: getNextArticle(article.date, articlesInCategory) || null,
      previousArticle: getPreviousArticle(article.date, articlesInCategory) || null,
    },
  };
}

export async function getStaticPaths() {
  const allArticles = await getAllArticles();
  const slugs = allArticles.map((article) => article.slug);
  return {
    paths: slugs.map(
      (slug) => ({ params: { slug } }),
    ),
    fallback: false,
  };
}
