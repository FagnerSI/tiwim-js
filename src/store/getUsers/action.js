import { message } from 'antd';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';

export function success(payload) {
    return { type: GET_USERS_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: GET_USERS_FAILURE, payload: error }
}

export default function getUsers() {
    return { type: GET_USERS_REQUEST, payload: {} }
}
