import axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import setJWTToken from '../../utilities/setJWTToken';
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser) => async dispatch => {
    try {
        await axios.post("http://localhost:5000/authentication/register", newUser);
        window.location.href = '/login';
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post("http://localhost:5000/authentication/login", LoginRequest);
        const { jwtToken } = await res.data;

        if(jwtToken) { 
            localStorage.setItem("jwtToken", jwtToken);
        }

        setJWTToken(jwtToken);

        const decoded = jwt_decode(jwtToken);

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
    } catch (error) {
        //console.log("error=>", error);
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const logout = () => async dispatch => {

    localStorage.removeItem("jwtToken");

    setJWTToken(false);

    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
}