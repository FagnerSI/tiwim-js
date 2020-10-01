import { message } from 'antd';
export const UPDATE_TOPIC_SUCCESS = 'UPDATE_TOPIC_SUCCESS';
export const UPDATE_TOPIC_FAILURE = 'UPDATE_TOPIC_FAILURE';
export const UPDATE_TOPIC_REQUEST = 'UPDATE_TOPIC_REQUEST';

export function success(payload) {
    message.success(`Tópico atualizado com sucesso.`);
    return { type: UPDATE_TOPIC_SUCCESS, payload }
}
export function failure(error) {
    message.error(error);
    return { type: UPDATE_TOPIC_FAILURE, payload: error }
}

export default function updateTopico(topic) {
    return { type: UPDATE_TOPIC_REQUEST, payload: topic }
}
