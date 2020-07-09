import {
    GET_TOPICS_PROJECT_REQUEST, GET_TOPICS_PROJECT_SUCCESS, GET_TOPICS_PROJECT_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_TOPICS_PROJECT_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case GET_TOPICS_PROJECT_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case GET_TOPICS_PROJECT_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
