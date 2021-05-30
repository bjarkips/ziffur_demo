import Image from 'next/image';
import {
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useIsMobile } from '../hooks';

const useStyles = makeStyles((theme) => ({
  subheading: {
    marginTop: theme.spacing(-3),
  },
}));

export default function Title() {
  const classes = useStyles();
  const isMobile = useIsMobile();
  return (
    <Box
      display="flex"
      // Add an extra 8 padding on top to match Navbar
      pt={isMobile ? 13 : 18}
      pb={isMobile ? 5 : 10}
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src="/ziffur/logo"
        alt="logo"
        width={isMobile ? 70 : 100}
        height={isMobile ? 70 : 100}
      />
      <Box
        ml={2}
        component="h1"
      >
        <Typography
          variant={isMobile ? 'h2' : 'h1'}
          align="right"
          component="span"
          display="block"
        >
          Ziffur
        </Typography>
        {
          !isMobile && (
            <Typography
              className={classes.subheading}
              component="span"
              display="block"
            >
              Computers and stuff, made simple.
            </Typography>
          )
        }
      </Box>
    </Box>
  );
}
