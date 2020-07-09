/* @flow */

import {
    ACCOUNT_REQUEST,
    ACCOUNT_SUCCESS,
    ACCOUNT_FAILURE,
    ACCOUNT_REMOVE_REQUEST,
    ACCOUNT_REMOVE_SUCCESS,
    ACCOUNT_REMOVE_FAILURE,
} from './action';

const initialState = {
    type: '',
    payload: {},
};

function reducer(state = initialState, action) {
    const { type } = action;

    if (type === ACCOUNT_REQUEST) {
        const { payload } = action;
        return Object.assign({}, { type, loading: false, payload });;
    }

    if (type === ACCOUNT_SUCCESS) {
        const { payload } = action;
        return Object.assign({}, { type, loading: true, payload });;
    }

    if (type === ACCOUNT_FAILURE) {
        const { payload } = action;
        return Object.assign({}, { type, loading: true, payload });;
    }

    if (type === ACCOUNT_REMOVE_REQUEST) {
        const { payload } = action;
        return Object.assign({}, { type, loading: false, payload });;
    }

    if (type === ACCOUNT_REMOVE_SUCCESS) {
        const { payload } = action;
        return Object.assign({}, { type, loading: true, payload });;
    }

    if (type === ACCOUNT_REMOVE_FAILURE) {
        const { payload } = action;
        return Object.assign({}, { type, loading: true, payload });;
    }

    return state;
}

export default reducer;
