
import { object } from 'underscore';

export const ACCOUNT_REQUEST = 'ACCOUNT_REQUEST';
export const ACCOUNT_SUCCESS = 'ACCOUNT_SUCCESS';
export const ACCOUNT_FAILURE = 'ACCOUNT_FAILURE';

export const ACCOUNT_REMOVE_REQUEST = 'ACCOUNT_REMOVE_REQUEST';
export const ACCOUNT_REMOVE_SUCCESS = 'ACCOUNT_REMOVE_SUCCESS';
export const ACCOUNT_REMOVE_FAILURE = 'ACCOUNT_REMOVE_FAILURE';

export function success(payload) {
    return {
        type: ACCOUNT_SUCCESS,
        payload,
    };
}

export function failure() {
    return {
        type: ACCOUNT_FAILURE,
        payload: {},
    };
}

export default function get() {
    return dispatch => {
        dispatch({
            type: ACCOUNT_REQUEST,
            payload: null,
        });

        const id = localStorage.getItem('@Account:id');
        const name = localStorage.getItem('@Account:name');
        const email = localStorage.getItem('@Account:email');
        const args = [id, name, email];


        const accountObj = object(
            [
                'id',
                'name',
                'email',
            ], args,
        );

        if (!accountObj.id || !accountObj.name || !accountObj.email) {
            dispatch(failure());
            return;
        }

        dispatch(success(accountObj));
    };
}

export function save(payload) {
    return dispatch => {
        localStorage.setItem('@Account:id', payload.id);
        localStorage.setItem('@Account:name', payload.name);
        localStorage.setItem('@Account:email', payload.email);
        dispatch(success(payload));
    };
}

export function remove() {
    return dispatch => {
        dispatch({
            type: ACCOUNT_REMOVE_REQUEST,
            payload: null,
        });
        localStorage.removeItem('@Account:id');
        localStorage.removeItem('@Account:name');
        localStorage.removeItem('@Account:email');
    };
}
