import {
    UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_PROJECT_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case UPDATE_PROJECT_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case UPDATE_PROJECT_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
