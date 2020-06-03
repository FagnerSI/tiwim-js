import {
    CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ACCOUNT_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case CREATE_ACCOUNT_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case CREATE_ACCOUNT_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
