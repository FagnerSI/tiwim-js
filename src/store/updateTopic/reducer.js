import {
    UPDATE_TOPIC_REQUEST, UPDATE_TOPIC_SUCCESS, UPDATE_TOPIC_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_TOPIC_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case UPDATE_TOPIC_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case UPDATE_TOPIC_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
