import { SET_CURRENT_USER, GET_ERRORS } from '../actions/types'

const initialSate = {
    user: {},
    validToken: false,
    error : null
};

const booleanActionPayload = (payload) => {
    if (payload) {
        return true;
    } else {
        return false;
    }
}

export default function (state = initialSate, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload
            };
        case GET_ERRORS:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state
    }
}