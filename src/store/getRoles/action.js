import { message } from 'antd';
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_FAILURE = 'GET_ROLES_FAILURE';
export const GET_ROLES_REQUEST = 'GET_ROLES_REQUEST';

export function success(payload) {
    return { type: GET_ROLES_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: GET_ROLES_FAILURE, payload: error }
}

export default function getRoles() {
    return { type: GET_ROLES_REQUEST, payload: {} }
}
