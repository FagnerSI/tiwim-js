import {
    CREATE_ROLE_REQUEST, CREATE_ROLE_SUCCESS, CREATE_ROLE_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ROLE_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case CREATE_ROLE_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case CREATE_ROLE_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
