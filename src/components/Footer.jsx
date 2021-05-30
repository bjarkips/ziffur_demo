import {
  Paper,
  Container,
  Typography,
  Grid,
  Box,
  Link as MuiLink,
} from '@material-ui/core';

export default function Footer() {
  return (
    <Paper square component="footer">
      <Container maxWidth="xs">
        <Box pt={6} pb={10}>
          <Grid
            container
            direction="column"
            spacing={2}
            justify="center"
            alignItems="center"
          >
            <Typography
              align="center"
              component={Grid}
              item
            >
              {/* mailto:hello@ziffur.com obfuscated using https://www.albionresearch.com/tools/obfuscator */}
              <MuiLink href="ma&#105;&#108;t&#111;&#58;h&#101;llo&#37;&#52;0zi%66fu&#114;&#46;%&#54;&#51;om">
                &#104;el&#108;o&#64;ziffu&#114;&#46;com
              </MuiLink>
            </Typography>
            <Typography
              component={Grid}
              item
              variant="caption"
              color="textSecondary"
            >
              Copyright © 2021 ziffur.com. All rights reserved.
            </Typography>
          </Grid>
        </Box>
      </Container>
    </Paper>
  );
}
