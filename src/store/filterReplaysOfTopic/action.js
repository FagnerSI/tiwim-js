import { message } from 'antd';
export const FILTER_REPLAYS_SUCCESS = 'FILTER_REPLAYS_SUCCESS';
export const FILTER_REPLAYS_FAILURE = 'FILTER_REPLAYS_FAILURE';
export const FILTER_REPLAYS_REQUEST = 'FILTER_REPLAYS_REQUEST';

export function success(payload) {
    return { type: FILTER_REPLAYS_SUCCESS, payload }
}

export function failure(error) {
    message.error(error);
    return { type: FILTER_REPLAYS_FAILURE, payload: error }
}

export default function get(payload) {
    return { type: FILTER_REPLAYS_REQUEST, payload }
}
