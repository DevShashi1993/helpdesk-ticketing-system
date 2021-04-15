import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
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
    <Container className={classes.root} maxWidth={false}>
      <Box mt={3}>
        <Tickets />
      </Box>
    </Container>
  );
};

export default TicketsView;
