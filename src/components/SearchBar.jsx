import { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  makeStyles,
  InputAdornment,
  TextField,
  Box,
  Typography,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Divider,
  Switch,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore, Search } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import Fuse from 'fuse.js';
import { SearchContext } from '../../pages/_app';
import { useIsMobile } from '../hooks';

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: `
    "nav"
    "main"
    "footer"
    `,
    height: '100vh',
  },
  nav: {
    gridArea: 'nav',
  },
  main: {
    gridArea: 'main',
  },
  footer: {
    gridArea: 'footer',
  },
  results: {
    position: 'absolute',
    width: 850,
    maxHeight: '60vh',
    right: 0,
    overscrollBehavior: 'contain',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      right: 'auto',
      left: 0,
      maxWidth: '80vw',
      maxHeight: '80vh',
    },
  },
  result: {
    padding: theme.spacing(2),
    maxWidth: '100%',
    display: 'block',
    overflowY: 'clip',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  articleSnippet: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(transparent, transparent 90%, white 95%)',
      pointerEvents: 'none',
    },
  },
}));

function FilterControls({ children, defaultExpanded }) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  ) : (
    <>
      <Typography
        variant="subtitle1"
        color="primary"
        paragraph
      >
        Filters
      </Typography>
      {children}
    </>
  );
}

FilterControls.propTypes = {
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
};

FilterControls.defaultProps = {
  defaultExpanded: false,
};

function SearchItem({ item }) {
  const classes = useStyles();
  const isMobile = useIsMobile();
  return (
    <Link href={item.url} passHref>
      <Box
        // Use JSS instead of Box props to override ButtonBase specificity after export
        className={classes.result}
        component={ButtonBase}
      >
        <Box
          display="flex"
          maxWidth={1}
          height={isMobile ? 70 : 100}
          alignItems={isMobile ? 'center' : 'flex-start'}
        >
          <Box
            position="relative"
            minWidth={isMobile ? 70 : 100}
            height={1}
          >
            <Image
              src={item.image}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <Box
            className={classes.articleSnippet}
            display="flex"
            flexDirection="column"
            px={2}
            maxHeight={1}
            overflow="clip"
          >
            <Box>
              <Typography
                variant="subtitle2"
                color="primary"
              >
                {item.title}
              </Typography>
            </Box>
            {/* eslint-disable-next-line react/no-danger */}
            {!isMobile && <div dangerouslySetInnerHTML={{ __html: item.content }} />}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

SearchItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default function SearchBar({ allArticles }) {
  const isMobile = useIsMobile();
  const classes = useStyles();
  const { filters, setFilters } = useContext(SearchContext);
  const {
    control,
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: { pattern: '' },
  });
  const router = useRouter();

  useEffect(
    // Make sure everything resets when navigating to a new page
    () => {
      reset();
      setFilters([]);
    },
    [router.asPath],
  );

  const fuse = new Fuse(allArticles, {
    keys: ['title', 'content', 'category'],
    threshold: 0.2,
    ignoreLocation: true,
  });

  const toggleTag = (event) => setFilters(
    event.target.checked
      ? [...filters, event.target.name]
      : [...filters.filter((tag) => tag !== event.target.name)],
  );

  const allResultItems = allArticles.map((article, i) => ({
    item: article,
    score: 1,
    refIndex: i,
  }));

  const { pattern } = watch();
  const results = !pattern ? allResultItems : fuse.search(pattern);

  const tags = results.reduce(
    //  All article tags in result set (with duplicates). Example:
    //    IN: [
    //      { item: { tags: ['Phishing', 'Binary'] } },
    //      { item: { tags: ['Phishing'] } },
    //      { item: { tags: ['Phishing', 'Mathematics'] } },
    //    ]
    //    OUT: ['Phishing', 'Binary', 'Phishing', 'Phishing', 'Mathematics']
    (acc, { item }) => [
      ...acc,
      ...item.tags,
    ],
    [],
  ).reduce(
    (acc, value) => ({
      //  Aggregate array values and count their occurrences. Example:
      //    IN ['Phishing', 'Binary', 'Phishing', 'Phishing', 'Mathematics']
      //    OUT { Phishing: 3, Binary: 1, Mathematics: 1 }
      ...acc,
      [value]: acc[value] ? acc[value] + 1 : 1,
    }),
    {},
  );

  const filteredResults = results.filter(
    ({ item }) => (!filters.length
      ? true
      : item.tags.some((tag) => filters.includes(tag))
    ),
  );

  const isSearchExpanded = !!pattern || !!filters.length;

  return (
    <ClickAwayListener
      onClickAway={(event) => {
        reset();
        // Make an exception for the tag filter buttons on the article page
        if (event.target.classList?.contains('tag-filter') !== true
          && event.target.parentElement?.classList?.contains('tag-filter') !== true
        ) {
          setFilters([]);
        }
      }}
    >
      <Box position="relative">
        <Controller
          control={control}
          name="pattern"
          render={({ field }) => (
            <TextField
              variant="outlined"
              size="small"
              label="Search"
              autoComplete="off"
              id="search-bar"
              InputProps={{
                ...field,
                endAdornment: (
                  <InputAdornment>
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        {
          isSearchExpanded && (
            <Box
              component={Paper}
              className={classes.results}
              pt={isMobile ? 1 : 2}
              display="flex"
              flexDirection={isMobile ? 'column' : 'row'}
            >
              <Box
                flexBasis="25%"
                maxWidth={isMobile ? 1 : '25%'}
                display="flex"
                flexDirection="column"
                p={isMobile ? 1 : 2}
                pl={isMobile ? 2 : 3}
              >
                <FilterControls defaultExpanded={!!filters.length}>
                  <FormControl>
                    <FormLabel>
                      <Typography
                        variant="body2"
                        gutterBottom
                        color="textSecondary"
                      >
                        Tags
                      </Typography>
                    </FormLabel>
                    <FormGroup>
                      {
                        Object.entries(tags).sort(
                          ([, quantityA], [, quantityB]) => quantityB - quantityA,
                        ).map(
                          ([tag, quantity]) => (
                            <FormControlLabel
                              key={tag}
                              control={(
                                <Switch
                                  color="primary"
                                  checked={filters.includes(tag)}
                                  onChange={toggleTag}
                                  name={tag}
                                  size={isMobile ? 'small' : 'medium'}
                                />
                              )}
                              label={(
                                <Typography variant="body2">
                                  {tag}
                                  &nbsp;
                                  <Typography variant="inherit" color="textSecondary">
                                    {`(${quantity})`}
                                  </Typography>
                                </Typography>
                              )}
                            />
                          ),
                        )
                      }
                    </FormGroup>
                  </FormControl>
                </FilterControls>
              </Box>
              <Box
                flexBasis={isMobile ? undefined : '75%'}
                maxWidth={isMobile ? undefined : '75%'}
              >
                {
                  !filteredResults.length && (
                    <Box px={2} py={2}>
                      <Typography color="textSecondary">
                        {`No articles found for "${pattern}". Please look for spelling mistakes, check your filter settings, and try again.`}
                      </Typography>
                    </Box>
                  )
                }
                {
                  filteredResults.map(
                    ({ item }, i) => (
                      <Fragment key={item.slug}>
                        { i !== 0 ? <Divider variant="middle" /> : null }
                        <SearchItem
                          item={item}
                        />
                      </Fragment>
                    ),
                  )
                }
              </Box>
            </Box>
          )
        }
      </Box>
    </ClickAwayListener>
  );
}

SearchBar.propTypes = {
  allArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
};
