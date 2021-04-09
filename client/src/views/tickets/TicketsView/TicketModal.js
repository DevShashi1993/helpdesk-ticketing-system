import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey
  },
  bookmarkButton: {
    position: 'absolute',
    right: theme.spacing(6),
    top: theme.spacing(1),
    color: theme.palette.grey
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h3">{children}</Typography>
      <IconButton
        color="primary"
        aria-label="bookmark"
        className={classes.bookmarkButton}
      >
        <BookmarkBorderIcon />
      </IconButton>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const TicketModal = ({ handleClickOpen, handleClose, ticketModalOpen, data }) => {
  const {
    ticketTitle,
    ticketDesc,
    tickeType,
    tickePriority,
    tickeStatus,
    tickeDueDate
  } = data;

  console.log('modal data: ', data);

  return (
    <div style={{ flex: 3 }}>
      <Dialog
        open={ticketModalOpen}
        onClose={handleClose}
        aria-labelledby="ticket-dialog-title"
      >
        <DialogTitle id="ticket-dialog-title" onClose={handleClose}>
          Ticket #10005
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <Typography gutterBottom variant="h5" component="h2">
                Title:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Test Ticket 10005
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography gutterBottom variant="h5" component="h2">
                Description:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </Grid>
            <Grid item md={6} xs={6}>
              <Typography gutterBottom variant="h5" component="h2">
                Ticket Type: 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                New Feature
              </Typography>
            </Grid>
            <Grid item md={6} xs={6}>
              <Typography gutterBottom variant="h5" component="h2">
                Priority:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Medium
              </Typography>
            </Grid>
            <Grid item md={6} xs={6}>
              <Typography gutterBottom variant="h5" component="h2">
                Due Date:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                25/04/2021
              </Typography>
            </Grid>
            <Grid item md={6} xs={6}>
              <Typography gutterBottom variant="h5" component="h2">
                Assigned To:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Shashikant Sharma
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketModal;
