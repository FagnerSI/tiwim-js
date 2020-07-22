import {
    DELETE_TOPIC_REQUEST, DELETE_TOPIC_SUCCESS, DELETE_TOPIC_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case DELETE_TOPIC_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case DELETE_TOPIC_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case DELETE_TOPIC_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
