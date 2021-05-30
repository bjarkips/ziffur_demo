import PropTypes from 'prop-types';
import Link from 'next/link';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { Instagram } from '@material-ui/icons';

export default function Social({ justify }) {
  return (
    <Grid
      container
      spacing={4}
      justify={justify}
      alignItems="center"
      wrap="nowrap"
    >
      <Grid item>
        <Link
          href="#"
          passHref
          prefetch={false}
        >
          <Tooltip title="Instagram">
            <IconButton
              variant="contained"
              component="a"
              target="_blank"
            >
              <Instagram />
            </IconButton>
          </Tooltip>
        </Link>
      </Grid>
    </Grid>
  );
}

Social.propTypes = {
  justify: PropTypes.string,
};

Social.defaultProps = {
  justify: 'center',
};
