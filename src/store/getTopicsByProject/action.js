import { message } from 'antd';
export const GET_TOPICS_PROJECT_SUCCESS = 'GET_TOPICS_PROJECT_SUCCESS';
export const GET_TOPICS_PROJECT_FAILURE = 'GET_TOPICS_PROJECT_FAILURE';
export const GET_TOPICS_PROJECT_REQUEST = 'GET_TOPICS_PROJECT_REQUEST';

export function success(payload) {
    return { type: GET_TOPICS_PROJECT_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: GET_TOPICS_PROJECT_FAILURE, payload: error }
}

export default function get(projectId) {
    return { type: GET_TOPICS_PROJECT_REQUEST, payload: projectId }
}
