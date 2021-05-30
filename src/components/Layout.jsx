import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Nav,
  Footer,
  Title,
  SearchBar,
} from '.';
import { images } from '../../next.config';

export default function Layout({
  allArticles,
  title,
  description,
  children,
  image,
}) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{`${title} - Ziffur`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={`${images.path}${image}`} />
        <meta property="og:url" content={`https://ziffur.netlify.app${router.asPath}`} />
        <meta property="og:description" content={description} />
      </Head>
      <header>
        <Nav searchBar={<SearchBar allArticles={allArticles} />} />
        <Title />
      </header>
      {children}
      <Footer />
    </>
  );
}

Layout.propTypes = {
  allArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
};

Layout.defaultProps = {
  image: '/ziffur/banner',
};
