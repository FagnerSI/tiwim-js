import {
    GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE,
} from './action';

const initState = {
    type: '',
    payload: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PROJECTS_REQUEST:
            return Object.assign({}, { type, loading: true }, { payload });
        case GET_PROJECTS_SUCCESS:
            return Object.assign({}, { type, loading: false }, { payload });
        case GET_PROJECTS_FAILURE:
            return Object.assign({}, { type, loading: false }, { payload });
        default:
            return state;
    }
}
