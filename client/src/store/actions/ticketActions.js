import axios from 'axios';
import {
  ADD_TICKET,
  DELETE_TICKET,
  GET_ALL_TICKETS,
  GET_TICKET,
  GET_ERRORS
} from './types';

export const createNewTicket = ticketData => async (dispatch, getState) => {
  try {
    const res = await axios.post('/ticket/new', ticketData);
    res.status === 200 && dispatch(getAllTickets());
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getAllTickets = () => async (dispatch, getState) => {
  try {
    let compId = getState().authState.user.compId;
    console.dir(compId);
    const res = await axios.get('/ticket/all', {
      params: {
        compId: compId,
      },
    });

    if (res.status === 200) {
      let ticketData = await res.data;
      // console.log('ticketData in action => ', ticketData);
      ticketData = ticketData.map(obj => {
        return {
          ticketID: obj.id,
          ticketTitle: obj.ticket_title,
          tickeType: obj.ticket_type,
          tickePriority: obj.ticket_priority,
          tickeStatus: obj.ticket_status,
          tickeDueDate: obj.due_date
        };
      });

      dispatch({
        type: GET_ALL_TICKETS,
        payload: ticketData || []
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

export const deleteAllTickets = () => async (dispatch, getState) => {
  if (
    window.confirm(
      'Are you sure? This will delete all the tickets and the data related to it'
    )
  ) {
    try {
      let compId = getState().authState.user.compId;
      const res = await axios.delete(`/ticket/deleteall`, {
        params: {
          compId: compId,
        },
      });
      res.status === 200 && dispatch(getAllTickets());
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

export const deleteTicket = ticketIdArr => async (dispatch, getState) => {
  if (
    window.confirm(
      'Are you sure? This will delete the selected tickets and the data related to it'
    )
  ) {
    try {
      let compId = getState().authState.user.compId;
      const res = await axios.delete(`/ticket/delete`, {
        params: {
          IDs: ticketIdArr.reduce((acc, curr) => `${acc},${curr}`),
          compId: compId,
        }
      });
      res.status === 200 && dispatch(getAllTickets());
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

// TODO: Delete Tickets in BULK  - to be implemented

// TODO: Insert Tickets in BULK  - to be implemented
