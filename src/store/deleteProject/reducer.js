import {
    DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case DELETE_PROJECT_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case DELETE_PROJECT_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case DELETE_PROJECT_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
