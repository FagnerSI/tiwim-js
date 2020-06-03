import { message } from 'antd';

export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';
export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';

export function success(payload) {
    message.success(`Conta foi criado com sucesso.`);
    return { type: CREATE_ACCOUNT_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: CREATE_ACCOUNT_FAILURE, payload: error }
}

export default function createAccount({ name, email, password, confirmPassword }) {
    return {
        type: CREATE_ACCOUNT_REQUEST,
        payload: {
            name,
            email,
            password,
            confirmPassword
        }
    }
}
