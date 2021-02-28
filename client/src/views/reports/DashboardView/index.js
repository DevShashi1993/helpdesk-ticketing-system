import React from 'react';
import { Button, Container, Grid, makeStyles } from '@material-ui/core';
import Budget from './Budget';
import TicketTrends from './TicketTrends';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TicketByCategory from './TicketByCategory';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Budget />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalCustomers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TasksProgress />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <TicketTrends />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <TicketByCategory />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
