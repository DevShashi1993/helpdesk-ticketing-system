import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import {
  getAllTickets,
  createNewTicket
} from '../../../store/actions/ticketActions';

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
    value: '100002',
    label: 'Chris Benetton'
  },
  {
    value: '100003',
    label: 'George Wiilam'
  },
  {
    value: '100004',
    label: 'Rashid Khan'
  }
];

const TicketModal = ({ addUserHandler }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authState);

  const initialValues = {
    ticketTitle: '',
    ticketDesc: '',
    ticketType: '101',
    ticketPriority: '101',
    dueDate: '',
    assignTo: '100001',
    createdBy: user.userID
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState(initialValues);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = ({
    ticketTitle,
    ticketDesc,
    ticketType,
    ticketPriority,
    dueDate,
    assignTo
  }) => {
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
    setModalOpen(false);
    setValues(initialValues);
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ flex: 3 }}>
      <Tooltip title="Add">
        <Button
          aria-label="add"
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
        >
          Create Ticket
        </Button>
      </Tooltip>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Ticket</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
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
    </div>
  );
};

export default TicketModal;
