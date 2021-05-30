import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Container,
} from '@material-ui/core';
import { Layout } from '../src/components';
import { useIsMobile } from '../src/hooks';
import { getAllArticles, getArticle } from '../src/lib/article';

export default function Privacy({ allArticles, privacyPolicy }) {
  const isMobile = useIsMobile();

  return (
    <Layout
      title="Privacy Policy"
      description=""
      allArticles={allArticles}
    >
      <Box
        mb={isMobile ? 5 : 10}
        component="main"
      >
        <Container
          maxWidth={isMobile ? 'sm' : 'md'}
          component="article"
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            paragraph
          >
            Ziffur.com Privacy Policy
          </Typography>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: privacyPolicy.content }} />
        </Container>
      </Box>
    </Layout>
  );
}

Privacy.propTypes = {
  allArticles: PropTypes.objectOf(PropTypes.any).isRequired,
  privacyPolicy: PropTypes.objectOf(PropTypes.string).isRequired,
};

export async function getStaticProps() {
  const allArticles = await getAllArticles();
  const privacyPolicy = await getArticle('privacy_policy');
  return {
    props: {
      allArticles,
      privacyPolicy,
    },
  };
}
