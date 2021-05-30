import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Button,
  ButtonBase,
  Card,
  makeStyles,
  Typography,
} from '@material-ui/core';
import 'highlight.js/styles/stackoverflow-light.css';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { Link as MuiLink } from '.';
import { getCategoryUrl } from '../lib/category';
import { images } from '../../next.config';

const imageHeight = {
  xs: 200,
  sm: 150,
  md: 500,
  lg: 480,
};

const imageWidthPercent = {
  xs: 30,
  sm: 100,
  md: 45,
  lg: 100,
};

const imageWidthPx = {
  // Used only for cloudinary cropping
  xs: 150,
  sm: 450,
  md: 450,
  lg: undefined,
};

const titleVariant = {
  xs: 'subtitle1',
  sm: 'h5',
  md: 'h5',
  lg: 'h4',
};

const useStyles = makeStyles((theme) => ({
  cardContent: (props) => {
    const padding = {
      xs: theme.spacing(2, 2),
      sm: theme.spacing(5, 4),
      md: theme.spacing(12, 6),
      lg: theme.spacing(8, 0, 0, 0),
    };
    const height = {
      xs: props.isFullLength ? undefined : 200,
      sm: 400,
      md: imageHeight.md,
      lg: undefined,
    };
    return {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: `
        "headline"
        "note"
        "article"
        "readMore"
      `,
      padding: padding[props.size],
      height: height[props.size],
    };
  },
  headline: {
    gridArea: 'headline',
  },
  note: {
    gridArea: 'note',
  },
  readMore: {
    display: 'flex',
    justifyContent: 'center',
    gridArea: 'readMore',
  },
  article: (props) => {
    const pVariant = {
      xs: 'body2',
      sm: 'body1',
      md: 'body1',
      lg: 'body1',
    };
    return {
      gridArea: 'article',
      overflow: 'clip',
      flexShrink: 1,
      position: 'relative',
      '&::after': !props.isFullLength
        ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(transparent, transparent 80%, white 95%)',
          pointerEvents: 'none',
        } : {},
      '& p, & li': {
        ...theme.typography[pVariant[props.size]],
      },
      '& blockquote p': props.isFullLength
        ? {
          ...theme.typography.h6,
        } : {
          ...theme.typography.body2,
        },
      '& footer': {
        marginTop: theme.spacing(5),
        ...theme.typography.body2,
      },
      '& img': {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        maxWidth: props.size === 'xs' ? '95%' : '80%',
      },
      '& pre': {
        margin: theme.spacing(0, 2),
      },
    };
  },
}));

function withLink(Component, url) {
  return (props) => (
    <Link
      href={url}
      passHref
      prefetch={false}
    >
      <ButtonBase component="a">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </ButtonBase>
    </Link>
  );
}

function SeriesNote({ series }) {
  const classes = useStyles();
  return (
    <Box
      className={classes.note}
      mb={2}
    >
      <Typography
        component="i"
        display="block"
        paragraph
        align="center"
      >
        This article is part of the series&nbsp;
        <MuiLink
          href={series.index.url}
          prefetch={false}
        >
          {series.index.title}
        </MuiLink>
        .
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        {
          series.previous ? (
            <MuiLink
              href={series.previous.url}
              prefetch={false}
            >
              <ArrowBack fontSize="inherit" />
              &nbsp;
              {series.previous.title}
            </MuiLink>
          ) : (
            <Box />
          )
        }
        {
          series.next && (
            <MuiLink
              href={series.next.url}
              prefetch={false}
            >
              {series.next.title}
              &nbsp;
              <ArrowForward fontSize="inherit" />
            </MuiLink>
          )
        }
      </Box>
    </Box>
  );
}

SeriesNote.propTypes = {
  series: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default function ArticleCard({
  article,
  size,
  series,
  isFullLength,
  isPrioritized,
}) {
  const classes = useStyles({ size, isFullLength });
  const isLink = size === 'xs' && !isFullLength; // In xs, the whole card is a clickable link
  const LinkCard = withLink(Card, article.url);
  const CardComponent = isLink ? LinkCard : Card;
  const imageLoader = ({ src, width }) => {
    const w = imageWidthPx[size] || width;
    const aspectRatio = w / imageHeight[size];
    return `${images.path}f_auto,w_${w},ar_${aspectRatio},c_fill,g_auto${src}`;
  };
  return (
    <article>
      <Box
        component={isFullLength ? 'div' : CardComponent}
        display={['xs', 'md'].includes(size) ? 'flex' : 'block'}
      >
        {
          !isFullLength && (
            <Box
              component={!isLink ? ButtonBase : 'div'}
              height={imageHeight[size]}
              width={1}
              position="relative"
              flexBasis={`${imageWidthPercent[size]}%`}
            >
              {
                !isLink ? (
                  <Link href={article.url} prefetch={false}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                      <Image
                        loader={imageLoader}
                        alt={article.title}
                        src={article.image}
                        layout="fill"
                        objectFit="cover"
                        priority={isPrioritized}
                      />
                    </a>
                  </Link>
                ) : (
                  <Image
                    loader={imageLoader}
                    alt={article.title}
                    src={article.image}
                    layout="fill"
                    objectFit="cover"
                  />
                )
              }
            </Box>
          )
        }
        <Box
          className={classes.cardContent}
          flexBasis={isFullLength ? '100%' : `${100 - imageWidthPercent[size]}%`}
        >
          <Box
            className={classes.headline}
            component="header"
          >
            {
              isLink ? (
                <Box mb={size === 'xs' ? 0 : 2}>
                  <Typography
                    variant={size === 'xs' ? 'overline' : 'button'}
                    color="secondary"
                  >
                    {article.category}
                  </Typography>
                </Box>
              ) : (
                <Box
                  mb={size === 'xs' ? 0 : 2}
                >
                  <MuiLink
                    href={getCategoryUrl(article.category)}
                    variant={size === 'xs' ? 'overline' : 'button'}
                    color="secondary"
                    prefetch={false}
                  >
                    {article.category}
                  </MuiLink>
                </Box>
              )
            }
            {
              (!isFullLength && !isLink) ? (
                <MuiLink
                  href={article.url}
                  gutterBottom={size !== 'xs'}
                  prefetch={false}
                >
                  <Typography
                    variant={titleVariant[size]}
                    component="h1"
                  >
                    {article.title}
                  </Typography>
                </MuiLink>
              ) : (
                <Typography
                  variant={titleVariant[size]}
                  gutterBottom={size !== 'xs'}
                  color="primary"
                  component="h1"
                >
                  {article.title}
                </Typography>
              )
            }
            {
              isFullLength && (
                <Typography
                  variant="body2"
                  paragraph
                  color="textSecondary"
                >
                  {article.date}
                </Typography>
              )
            }
          </Box>
          { series && <SeriesNote series={series} /> }
          <div
            className={classes.article}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          {
            !isFullLength && !isLink && (
              <Box
                className={classes.readMore}
                pt={1}
              >
                <Link
                  href={article.url}
                  passHref
                  prefetch={false}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    component="a"
                  >
                    Read More
                  </Button>
                </Link>
              </Box>
            )
          }
        </Box>
      </Box>
    </article>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.objectOf(PropTypes.any).isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']).isRequired,
  series: PropTypes.objectOf(PropTypes.any),
  isFullLength: PropTypes.bool,
  isPrioritized: PropTypes.bool,
};

ArticleCard.defaultProps = {
  series: null,
  isFullLength: false,
  isPrioritized: false,
};
