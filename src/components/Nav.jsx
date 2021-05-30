import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { Link, NavDrawer } from '.';
import { useIsMobile } from '../hooks';
import { categories, getCategoryUrl } from '../lib/category';

export default function Nav({ searchBar }) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const links = [
    { title: 'Home', path: '/' },
    ...categories.map(
      (category) => ({ title: category, path: getCategoryUrl(category) }),
    ),
  ];
  return (
    <AppBar color="inherit" component="nav">
      <Toolbar>
        <Container maxWidth={isMobile ? 'xs' : 'lg'}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={isMobile ? 'row-reverse' : 'row'}
          >
            {
              isMobile ? <NavDrawer links={links} /> : (
                <Grid
                  container
                  spacing={6}
                  alignContent="center"
                  wrap="nowrap"
                >
                  {
                    links.map(({ title, path }) => (
                      <Grid item key={title}>
                        {
                          path !== router.asPath ? (
                            <Link
                              href={path}
                              variant="subtitle1"
                              color="textPrimary"
                              prefetch={false}
                            >
                              {title}
                            </Link>
                          ) : (
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {title}
                            </Typography>
                          )
                        }
                      </Grid>
                    ))
                  }
                </Grid>
              )
            }
            {searchBar}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

Nav.propTypes = {
  searchBar: PropTypes.element.isRequired,
};
