import {
    DELETE_REPLAY_REQUEST, DELETE_REPLAY_SUCCESS, DELETE_REPLAY_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case DELETE_REPLAY_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case DELETE_REPLAY_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case DELETE_REPLAY_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
