import {
    FILTER_REPLAYS_REQUEST, FILTER_REPLAYS_SUCCESS, FILTER_REPLAYS_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case FILTER_REPLAYS_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case FILTER_REPLAYS_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case FILTER_REPLAYS_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
