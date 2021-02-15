import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  Grid
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createNewTicket } from '../../../store/actions/ticketActions';

const ticketType = [
  {
    value: '101',
    label: 'Defect'
  },
  {
    value: '102',
    label: 'Feature Request'
  },
  {
    value: '103',
    label: 'New Feature'
  },
  {
    value: '104',
    label: 'Research'
  },
  {
    value: '105',
    label: 'Request'
  },
  {
    value: '106',
    label: 'Questionnaire'
  },
  {
    value: '107',
    label: 'Incident'
  }
];

const ticketPriority = [
  {
    value: '101',
    label: 'Low'
  },
  {
    value: '102',
    label: 'Medium'
  },
  {
    value: '103',
    label: 'High'
  },
  {
    value: '104',
    label: 'Urgent'
  }
];

const assignTo = [
  {
    value: '100001',
    label: 'Shashikant Sharma'
  },
  {
    value: '100001',
    label: 'Jeff Luman'
  },
  {
    value: '100001',
    label: 'Mike Lyda'
  },
  {
    value: '100001',
    label: 'Phil Ball'
  }
];

export default function TicketModal({ isOpen, handleClose }) {
  const { user } = useSelector(state => state.authState);

  const dispatch = useDispatch();
  const [values, setValues] = useState({
    ticketTitle: '',
    ticketDesc: '',
    ticketType: '',
    ticketPriority: '',
    dueDate: '',
    assignTo: '',
    createdBy: user.userID
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = ({ticketTitle, ticketDesc, ticketType, ticketPriority, dueDate, assignTo}) => {
    console.log('submit called');
    dispatch(
      createNewTicket({
        ticketTitle,
        ticketDesc,
        ticketType,
        ticketPriority,
        dueDate,
        assignTo,
        createdBy: user.userID
      })
    );
  };

  const ticketModal = {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'auto',
    minWidth: 120
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      disableBackdropClick={true}
    >
      <DialogTitle id="form-dialog-title">Create Ticket</DialogTitle>
      <DialogContent style={ticketModal}>
        <form autoComplete="off" noValidate>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the Ticket Title"
                label="Ticket Title"
                name="ticketTitle"
                onChange={handleChange}
                value={values.ticketTitle}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Ticket Description"
                name="ticketDesc"
                onChange={handleChange}
                value={values.ticketDesc}
                required
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ticket Type"
                name="ticketType"
                onChange={handleChange}
                value={values.ticketType}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {ticketType.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Ticket Priority"
                name="ticketPriority"
                onChange={handleChange}
                value={values.ticketPriority}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {ticketPriority.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Due Date"
                name="dueDate"
                type="date"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
                required
                value={values.dueDate}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Assign To"
                name="assignTo"
                onChange={handleChange}
                value={values.assignTo}
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {assignTo.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(values)} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
