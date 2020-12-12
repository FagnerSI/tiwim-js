import { message } from 'antd';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_FAILURE = 'UPDATE_PROJECT_FAILURE';
export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST';

export function success(payload) {
    message.success(`A discussão foi atualizado com sucesso.`);
    return { type: UPDATE_PROJECT_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: UPDATE_PROJECT_FAILURE, payload: error }
}

export default function updateProject(project) {
    return { type: UPDATE_PROJECT_REQUEST, payload: project }
}
