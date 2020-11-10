import { message } from 'antd';
import { save } from '~/store/account/action';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE';
export const UPDATE_ACCOUNT_REQUEST = 'UPDATE_ACCOUNT_REQUEST';

export function success(payload) {
    message.success(`A conta foi atualizado com sucesso.`);

    return dispatch => {
        dispatch(save(payload));
        dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload });
    }
}

export function failure(error) {
    message.error(error);
    return { type: UPDATE_ACCOUNT_FAILURE, payload: error }
}

export default function updateAccount(account) {
    return { type: UPDATE_ACCOUNT_REQUEST, payload: account }
}
