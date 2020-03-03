import {
    CREATE_TOPIC_REQUEST, CREATE_TOPIC_SUCCESS, CREATE_TOPIC_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_TOPIC_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case CREATE_TOPIC_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case CREATE_TOPIC_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
