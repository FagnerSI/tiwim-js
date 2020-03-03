import { message } from 'antd';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';

export function success(payload) {
    message.success(`O projeto foi deletado.`);
    return { type: DELETE_PROJECT_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: DELETE_PROJECT_FAILURE, payload: error }
}

export default function deleteProject(project) {
    return { type: DELETE_PROJECT_REQUEST, payload: project }
}
