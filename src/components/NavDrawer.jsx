import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export default function NavDrawer({ links }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (bool) => () => { setIsOpen(bool); };
  const list = (
    <Box
      width={250}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height={1}
      pb={1}
      id="nav-menu"
    >
      <List>
        {links.map(({ title, path }) => (
          <Link
            href={path}
            key={title}
            passHref
            prefetch={false}
          >
            <ListItem
              button
              component="a"
            >
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <IconButton
        aria-controls="nav-menu"
        aria-haspopup="true"
        aria-label="Open navigation menu"
        onClick={toggleDrawer(true)}
      >
        <Menu />
      </IconButton>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer(false)}
        anchor="right"
        id="nav-menu"
      >
        {list}
      </Drawer>
    </>
  );
}

NavDrawer.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};
