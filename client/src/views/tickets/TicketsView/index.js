import React, { useState } from 'react';
import { Button, Box, Container, Typography, makeStyles } from '@material-ui/core';
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
    paddingTop: theme.spacing(3),
  }
}));

const floatingBtn = {
  position: 'absolute',
  // width : '80px',
  // height : '80px',
  // borderRadius : '50%',
  top: '85%',
  right: '5%',
  zIndex: '1000'
};

const TicketsView = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page className={classes.root} title="Tickets">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Typography color="textPrimary" variant="h2">
            All Tickets
          </Typography>
          <Tickets />
          <TicketModal isOpen={open} handleClose={handleClose} />
          <Fab
            color="primary"
            aria-label="add"
            style={floatingBtn}
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Container>
    </Page>
  );
};

export default TicketsView;
