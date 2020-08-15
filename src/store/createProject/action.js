import { message } from 'antd';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';
export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';

export function success(payload) {
    message.success(`O projeto foi criado com sucesso.`);
    return { type: CREATE_PROJECT_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: CREATE_PROJECT_FAILURE, payload: error }
}

export default function createProject(project) {
    return { type: CREATE_PROJECT_REQUEST, payload: project }
}
