import {
    GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case GET_USERS_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case GET_USERS_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
