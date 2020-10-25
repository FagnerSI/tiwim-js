import { message } from 'antd';
export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS';
export const CREATE_ROLE_FAILURE = 'CREATE_ROLE_FAILURE';
export const CREATE_ROLE_REQUEST = 'CREATE_ROLE_REQUEST';

export function success(payload) {
    message.success(`Papel criado com sucesso!`);
    return { type: CREATE_ROLE_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: CREATE_ROLE_FAILURE, payload: error }
}

export default function createRole(ROLE) {
    return { type: CREATE_ROLE_REQUEST, payload: ROLE }
}
