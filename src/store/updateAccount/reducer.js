import {
    UPDATE_ACCOUNT_REQUEST,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_ACCOUNT_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case UPDATE_ACCOUNT_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case UPDATE_ACCOUNT_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
