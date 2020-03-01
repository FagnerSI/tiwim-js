import { message } from 'antd';
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_FAILURE = 'GET_PROJECTS_FAILURE';
export const GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST';

export function success(payload) {
    return { type: GET_PROJECTS_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: GET_PROJECTS_FAILURE, payload: error }
}

export default function getProjects() {
    return { type: GET_PROJECTS_REQUEST, payload: {} }
}
