import { message } from 'antd';
export const DELETE_REPLAY_SUCCESS = 'DELETE_REPLAY_SUCCESS';
export const DELETE_REPLAY_FAILURE = 'DELETE_REPLAY_FAILURE';
export const DELETE_REPLAY_REQUEST = 'DELETE_REPLAY_REQUEST';

export function success(payload) {
    message.success(`Comentário removida com sucesso!`);
    return { type: DELETE_REPLAY_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: DELETE_REPLAY_FAILURE, payload: error }
}

export default function DELETEReplay(replayId) {
    return { type: DELETE_REPLAY_REQUEST, payload: replayId }
}
