import { GET_ALL_TICKETS, ADD_TICKET, GET_ERRORS } from '../actions/types';

const initialSate = {
  allTicketData: [],
  error: null
};

const ticketReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_ALL_TICKETS:
      return {
        ...state,
        allTicketData: action.payload
      };
    case ADD_TICKET:
      return {
        ...state,
        error: action.payload
    };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export default ticketReducer;
