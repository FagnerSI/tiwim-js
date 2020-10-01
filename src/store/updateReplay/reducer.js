import {
    UPDATE_REPLAY_REQUEST, UPDATE_REPLAY_SUCCESS, UPDATE_REPLAY_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_REPLAY_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case UPDATE_REPLAY_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case UPDATE_REPLAY_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
