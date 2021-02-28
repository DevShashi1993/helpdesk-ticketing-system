import axios from 'axios';
import {
  ADD_TICKET,
  DELETE_TICKET,
  GET_ALL_TICKETS,
  GET_TICKET,
  GET_ERRORS
} from './types';

export const createNewTicket = ticketData => async dispatch => {
  // console.log('ticketData', ticketData);
  try {
    await axios.post('/ticket/new', ticketData);
    dispatch({
      type: ADD_TICKET,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getAllTickets = () => async dispatch => {
  try {
    const res = await axios.get('/ticket/all');

    if (res.status === 200) {
      let ticketData = await res.data;

      ticketData = ticketData.map(obj => {
        return {
          ticketID: obj.id,
          ticketTitle: obj.ticket_title,
          tickeType: obj.ticket_type,
          tickePriority: obj.ticket_priority,
          tickeStatus: obj.ticket_status,
          tickeDueDate: obj.due_date,
        };
      });

      dispatch({
        type: GET_ALL_TICKETS,
        payload: ticketData
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// TODO: to be implemented
export const getTicket = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/ticket/${id}`);
    dispatch({
      type: GET_TICKET,
      payload: res.data
    });
  } catch (error) {
    history.push('/dashboard');
  }
};

// TODO: to be implemented
export const deleteTicket = id => async dispatch => {
  if (
    window.confirm(
      'Are you sure? This will delete the ticket and all the data related to it'
    )
  ) {
    try {
      await axios.delete(`/ticket/${id}`);
      dispatch({
        type: DELETE_TICKET,
        payload: id
      });
    } catch (error) {}
  }
};

// TODO: Delete Tickets in BULK  - to be implemented

// TODO: Insert Tickets in BULK  - to be implemented
