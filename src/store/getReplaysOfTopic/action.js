import { message } from 'antd';
export const GET_REPLAYS_TOPIC_SUCCESS = 'GET_REPLAYS_TOPIC_SUCCESS';
export const GET_REPLAYS_TOPIC_FAILURE = 'GET_REPLAYS_TOPIC_FAILURE';
export const GET_REPLAYS_TOPIC_REQUEST = 'GET_REPLAYS_TOPIC_REQUEST';

export function success(payload) {
    return { type: GET_REPLAYS_TOPIC_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: GET_REPLAYS_TOPIC_FAILURE, payload: error }
}

export default function get(topicId) {
    return { type: GET_REPLAYS_TOPIC_REQUEST, payload: topicId }
}
