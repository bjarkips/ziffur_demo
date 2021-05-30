import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#001354',
    },
    secondary: {
      main: '#b95a00',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h1: {
      fontFamily: 'Rozha One',
      fontSize: '5rem',
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h2: {
      fontFamily: 'Rozha One',
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 500,
    },
    overline: {
      fontWeight: 500,
    },
  },
});

export default theme;
