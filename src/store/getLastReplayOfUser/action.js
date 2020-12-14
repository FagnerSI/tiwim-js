import { message } from 'antd';
export const GET_LAST_REPLAY_USER_SUCCESS = 'GET_LAST_REPLAY_USER_SUCCESS';
export const GET_LAST_REPLAY_USER_FAILURE = 'GET_LAST_REPLAY_USER_FAILURE';
export const GET_LAST_REPLAY_USER_REQUEST = 'GET_LAST_REPLAY_USER_REQUEST';

export function success(payload) {
    return { type: GET_LAST_REPLAY_USER_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: GET_LAST_REPLAY_USER_FAILURE, payload: error }
}

export default function get(projectId) {
    return { type: GET_LAST_REPLAY_USER_REQUEST, payload: projectId }
}
