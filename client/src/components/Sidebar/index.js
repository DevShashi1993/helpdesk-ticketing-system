import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
} from 'react-feather';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import SettingsIcon from '@material-ui/icons/Settings';
import SideItems from './SideItems';
// import "./Sidebar.css";

const user = {
  avatar: '/static/images/avatars/avatar_5.png',
  jobTitle: 'Senior Web Developer',
  name: 'Shashikant Sharma'
};

const items = [
  {
    href: '/app/dashboard',
    icon: AssessmentIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/assignments',
    icon: ListAltIcon,
    title: 'My Assignments'
  },
  {
    href: '/app/bookmarks',
    icon: BookmarksIcon,
    title: 'Bookmarks'
  },
  {
    href: '/app/account',
    icon: AccountBoxIcon,
    title: 'Account'
  },
  {
    href: '/app/setting',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const Sidebar = ({ openMobile, onMobileClose, }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <SideItems
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

Sidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

Sidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default Sidebar;
