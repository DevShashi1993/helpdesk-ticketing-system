import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from '../../components/Logo';
import './Navbar.css';
import { logout } from '../../store/actions/authActions';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const Navbar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [notifications] = useState([]);
  const { validToken } = useSelector(state => state.authState);

  const logoutHandler = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        {/* <h3>HelpDesk</h3> */}
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        {validToken && (
          <Hidden mdDown>
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={logoutHandler}>
              <InputIcon />
            </IconButton>
          </Hidden>
        )}

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
