import React, { useState } from 'react';
import { Button, Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tickets from './Tickets';
import TicketModal from './TicketModal';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const floatingBtn = {
  position: 'absolute',
  width : '80px',
  height : '80px',
  borderRadius : '50%',
  top: '80%',
  right: '5%',
  zIndex: '1000'
};

const TicketsView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Tickets">
      <Container maxWidth={false}>
        <Box mt={3}>
          <h1>This is Ticket page</h1>
          <Tickets />
          <TicketModal/>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      </Container>
    </Page>
  );
};

export default TicketsView;
