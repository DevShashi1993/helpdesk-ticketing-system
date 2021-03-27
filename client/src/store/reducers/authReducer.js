import { SET_CURRENT_USER, GET_ERRORS } from '../actions/types';

const initialSate = {
  user: {
    userID: '',
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    compId: ''
  },
  validToken: false,
  error: null
};
const authReducer = (state = initialSate, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: action.payload.decoded_jwtToken ? true : false,
        user: action.payload.userData
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

export default authReducer;
