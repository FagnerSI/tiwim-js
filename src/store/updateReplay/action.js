import { message } from 'antd';
export const UPDATE_REPLAY_SUCCESS = 'UPDATE_REPLAY_SUCCESS';
export const UPDATE_REPLAY_FAILURE = 'UPDATE_REPLAY_FAILURE';
export const UPDATE_REPLAY_REQUEST = 'UPDATE_REPLAY_REQUEST';

export function success(payload) {
    message.success(`Mensagem atualizada com sucesso.`);
    return { type: UPDATE_REPLAY_SUCCESS, payload }
}
export function failure(error) {
    message.error(error);
    return { type: UPDATE_REPLAY_FAILURE, payload: error }
}

export default function updateReplay(replay) {
    return { type: UPDATE_REPLAY_REQUEST, payload: replay }
}
