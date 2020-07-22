import { message } from 'antd';
export const DELETE_TOPIC_SUCCESS = 'DELETE_TOPIC_SUCCESS';
export const DELETE_TOPIC_FAILURE = 'DELETE_TOPIC_FAILURE';
export const DELETE_TOPIC_REQUEST = 'DELETE_TOPIC_REQUEST';

export function success(payload) {
    message.success(`O topico foi deletado com sucesso.`);
    return { type: DELETE_TOPIC_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: DELETE_TOPIC_FAILURE, payload: error }
}

export default function deleteTopic(topic) {
    return { type: DELETE_TOPIC_REQUEST, payload: topic }
}
