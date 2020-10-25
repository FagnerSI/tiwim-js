import {
    GET_ROLES_REQUEST, GET_ROLES_SUCCESS, GET_ROLES_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ROLES_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case GET_ROLES_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case GET_ROLES_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
