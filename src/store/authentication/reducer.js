import {
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILURE,
    GET_TOKEN_SUCCESS,
    GET_TOKEN_FAILURE,
    GET_TOKEN_REQUEST,
    LOGOUT,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATION_REQUEST:
        case GET_TOKEN_REQUEST:
            return Object.assign({}, { type, loading: true, payload });
        case AUTHENTICATION_SUCCESS:
        case AUTHENTICATION_FAILURE:
        case GET_TOKEN_SUCCESS:
        case GET_TOKEN_FAILURE:
        case LOGOUT:
            return Object.assign({}, { type, loading: false, payload });
        default:
            return state;
    }
}
