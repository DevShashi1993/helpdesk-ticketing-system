import axios from 'axios';
import {
  ADD_TICKET,
  DELETE_TICKET,
  GET_ALL_TICKETS,
  GET_TICKET,
  GET_ERRORS
} from './types';
import Ticket from '../../model/Ticket';

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
        compId: compId
      }
    });

    if (res.status === 200) {
      let allTicketData = await res.data;
      allTicketData = allTicketData.map(obj => {
        let ticket = new Ticket(
          obj.id,
          obj.ticket_title,
          obj.ticket_type,
          obj.ticket_priority,
          obj.ticket_status,
          obj.due_date
        );

        return ticket;
      });

      dispatch({
        type: GET_ALL_TICKETS,
        payload: allTicketData || []
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getTicket = id => async (dispatch, getState) => {
  try {
    let compId = getState().authState.user.compId;
    const res = await axios.get(`/ticket`, {
      params: { id: id, compId: compId }
    });

    if (res.status === 200) {
      const ticketArr = await res.data;

      if (ticketArr.length == 1) {
        let ticketData = ticketArr[0];

        const {
          id,
          ticket_title,
          ticket_desc,
          ticket_type,
          ticket_priority,
          ticket_status,
          due_date
        } = ticketData;

        let ticket = new Ticket(id,
          ticket_title,
          ticket_desc,
          ticket_type,
          ticket_priority,
          ticket_status,
          due_date);

        return ticket;

        // dispatch({
        //   type: GET_TICKET,
        //   payload: res.data
        // });
      }
    }
  } catch (error) {
    console.log(error);
    //history.push('/dashboard');
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
          compId: compId
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
          compId: compId
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
