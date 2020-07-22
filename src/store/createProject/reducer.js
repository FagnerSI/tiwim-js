import {
    CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PROJECT_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case CREATE_PROJECT_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case CREATE_PROJECT_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
