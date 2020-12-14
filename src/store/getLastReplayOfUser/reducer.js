import {
    GET_LAST_REPLAY_USER_REQUEST, GET_LAST_REPLAY_USER_SUCCESS, GET_LAST_REPLAY_USER_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_LAST_REPLAY_USER_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case GET_LAST_REPLAY_USER_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case GET_LAST_REPLAY_USER_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
