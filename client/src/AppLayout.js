import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import NavBar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
  },
  wrapperWithLeftPadding: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const AppLayout = ({ isDashboardLayout }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const dashboardLayout = (<>
    <NavBar onMobileNavOpen={() => setMobileNavOpen(true)} />
    <Sidebar
      onMobileClose={() => setMobileNavOpen(false)}
      openMobile={isMobileNavOpen}
    />
    <div className={classes.wrapperWithLeftPadding} >
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  </>);

  const mainLayout = (<>
    <NavBar />
    <div className={classes.wrapper}>
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  </>);

  return (
    <div className={classes.root}>
      {isDashboardLayout ? dashboardLayout : mainLayout}
    </div>
  );
};

export default AppLayout;
