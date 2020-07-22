import { message } from 'antd';
export const CREATE_TOPIC_SUCCESS = 'CREATE_TOPIC_SUCCESS';
export const CREATE_TOPIC_FAILURE = 'CREATE_TOPIC_FAILURE';
export const CREATE_TOPIC_REQUEST = 'CREATE_TOPIC_REQUEST';

export function success(payload) {
    message.success(`O topico ${payload.title} foi criado.`);
    return { type: CREATE_TOPIC_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: CREATE_TOPIC_FAILURE, payload: error }
}

export default function createTopic(topic) {
    return { type: CREATE_TOPIC_REQUEST, payload: topic }
}
