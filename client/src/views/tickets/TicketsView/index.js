import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Tickets from './Tickets';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const TicketsView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Tickets">
      <Container maxWidth={false}>
        <Box mt={3}>
          <h1>This is Ticket page</h1>
          <Tickets/>
        </Box>
      </Container>
    </Page>
  );
};

export default TicketsView;
