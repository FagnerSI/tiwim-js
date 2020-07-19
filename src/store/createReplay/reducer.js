import {
    CREATE_REPLAY_REQUEST, CREATE_REPLAY_SUCCESS, CREATE_REPLAY_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_REPLAY_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case CREATE_REPLAY_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case CREATE_REPLAY_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
