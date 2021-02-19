import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const { user } = useSelector(state => state.authState);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile user={user} />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProfileDetails user={user} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
