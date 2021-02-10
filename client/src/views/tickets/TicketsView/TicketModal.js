import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  InputLabel,
  FormHelperText,
  Link,
  TextField,
  Typography,
  MenuItem,
  Select,
  makeStyles
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TicketModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ticketModal = {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '500px',
    minWidth: 120
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <h1>Create Ticket</h1>
        </DialogTitle>
        <DialogContent style={ticketModal}>
          <form noValidate autoComplete="off">
            <TextField
              autoFocus
              margin="dense"
              id="tickettitle"
              label="Ticket Title"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="ticketdesc"
              label="Ticket Description"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
            <FormControl variant="outlined" style={{minWidth : "150px"}}>
              <InputLabel id="demo-simple-select-outlined-label">Ticket Type</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Ticket Type"
              >
                <MenuItem value="">
                  Defect
                </MenuItem>
                <MenuItem value={10}>Feature Request</MenuItem>
                <MenuItem value={20}>New Feature</MenuItem>
                <MenuItem value={30}>Research</MenuItem>
                <MenuItem value={10}>Request</MenuItem>
                <MenuItem value={20}>Questionnaire</MenuItem>
                <MenuItem value={30}>Incident</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" style={{minWidth : "150px"}}>
              <InputLabel id="demo-simple-select-outlined-label">Ticket Priority</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Ticket Type"
              >
                <MenuItem value="">
                  Low
                </MenuItem>
                <MenuItem value={10}>Medium</MenuItem>
                <MenuItem value={20}>High</MenuItem>
                <MenuItem value={30}>Urgent</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" style={{minWidth : "150px"}}>
              <InputLabel id="demo-simple-select-outlined-label">Assign To</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Ticket Type"
              >
                <MenuItem value="">
                  Shashikant Sharma
                </MenuItem>
                <MenuItem value={10}>Jeff Luman</MenuItem>
                <MenuItem value={20}>Phil Ball</MenuItem>
                <MenuItem value={30}>Mike Lyda</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
