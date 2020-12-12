import { message } from 'antd';

export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE';
export const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST';

export function success(payload) {
    return { type: CREATE_ACCOUNT_SUCCESS, payload }
}

export function failure({ data }) {
    const error = () => {
        if (data['email']) return 'Já existe uma conta cadastrada com este e-mail.';
        if (data['password']) return data['password'][0];
    };

    message.error(error() || 'Falha ou tentar criar conta');
    return { type: CREATE_ACCOUNT_FAILURE, payload: data }
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
