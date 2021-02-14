import axios from 'axios'
import { ADD_TICKET, DELETE_TICKET, GET_ALL_TICKETS, GET_TICKET, GET_ERRORS } from './types';

export const createNewTicket = (ticketData) => async dispatch => {
    console.log("ticketData", ticketData);
    try {
        await axios.post("http://localhost:5000/ticket/new", ticketData)
        window.location.href = '/app/tickets';
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

export const getTickets = () => async dispatch => {
    const res = await axios.get("http://localhost:5000/ticket/all")
    dispatch({
        type: GET_ALL_TICKETS,
        payload: res.data
    });
};

export const getTicket = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/ticket/${id}`)
        dispatch({
            type: GET_TICKET,
            payload: res.data
        });
    } catch (error) {
        history.push('/dashboard')
    }
};

export const deleteTicket = (id) => async dispatch => {
    if (window.confirm("Are you sure? This will delete the ticket and all the data related to it")) {
        try {
            await axios.delete(`http://localhost:5000/ticket/${id}`)
            dispatch({
                type: DELETE_TICKET,
                payload: id
            });
        } catch (error) {
        }
    }
};