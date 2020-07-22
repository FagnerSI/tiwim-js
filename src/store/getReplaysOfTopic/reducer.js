import {
    GET_REPLAYS_TOPIC_REQUEST, GET_REPLAYS_TOPIC_SUCCESS, GET_REPLAYS_TOPIC_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_REPLAYS_TOPIC_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case GET_REPLAYS_TOPIC_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case GET_REPLAYS_TOPIC_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
