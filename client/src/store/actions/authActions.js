import axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import setJWTToken from '../../utilities/setJWTToken';
import jwt_decode from 'jwt-decode';

export const createNewUser = newUser => async dispatch => {
  try {
    await axios.post('/authentication/register', newUser);
    window.location.href = '/login';
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    const res = await axios.post('/authentication/login', LoginRequest);
    const { user_id, first_name, last_name, company_id, email, jwtToken } = await res.data;
    let userData = {
      userID: user_id,
      firstName: first_name,
      lastName: last_name,
      email: email,
      compId: company_id
    };

    if (jwtToken) {
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('htsUser', JSON.stringify(userData));
    }

    setJWTToken(jwtToken);

    const decoded_jwtToken = jwt_decode(jwtToken);

    dispatch({
      type: SET_CURRENT_USER,
      payload: { userData, decoded_jwtToken }
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('htsUser');

  setJWTToken(false);

  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
