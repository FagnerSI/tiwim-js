import { message } from 'antd';
export const CREATE_REPLAY_SUCCESS = 'CREATE_REPLAY_SUCCESS';
export const CREATE_REPLAY_FAILURE = 'CREATE_REPLAY_FAILURE';
export const CREATE_REPLAY_REQUEST = 'CREATE_REPLAY_REQUEST';

export function success(payload) {
    message.success(`Mensagem foi enviada com sucesso!`);
    return { type: CREATE_REPLAY_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: CREATE_REPLAY_FAILURE, payload: error }
}

export default function createReplay(replay) {
    return { type: CREATE_REPLAY_REQUEST, payload: replay }
}
