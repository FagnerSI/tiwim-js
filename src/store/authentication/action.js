import { message } from 'antd';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';
export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST';

export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';
export const GET_TOKEN_REQUEST = 'GET_TOKEN_REQUEST';

export const LOGOUT = 'LOGOUT';

export function success(payload) {
    localStorage.setItem('@AuthToken', payload.token);
    return { type: AUTHENTICATION_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: AUTHENTICATION_FAILURE, payload: error }
}

export function currentToken() {
    return dispatch => {
        dispatch({
            type: GET_TOKEN_REQUEST,
            payload: false,
        });

        const token = localStorage.getItem('@AuthToken');

        if (!token || token === '') {
            dispatch({
                type: GET_TOKEN_FAILURE,
                payload: false,
            });
        } else {
            dispatch({
                type: GET_TOKEN_SUCCESS,
                payload: {
                    token,
                },
            });
        }
    };
}

export function logout() {
    localStorage.setItem('@AuthToken', '');

    return {
        type: LOGOUT,
        payload: {},
    };
}

export default function login(email, password) {
    localStorage.setItem('@AuthToken', '');
    return {
        type: AUTHENTICATION_REQUEST,
        payload: {
            email,
            password,
        }
    }
}
