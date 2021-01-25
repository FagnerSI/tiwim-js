import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { FILTER_REPLAYS_REQUEST, success, failure } from './action';

function* getTopics({ payload }) {
    const kind_speech = payload.kind_speech || '';
    const roles_in = payload.roles_in || '';
    const roles_for = payload.roles_for || '';

    try {
        let { data } = yield call(
            api().get,
            `/topics/${payload.id}/filter_replays?kind_speech=${kind_speech}&roles_in=${roles_in}&roles_for=${roles_for}`);
        yield put(success(data));
    } catch (error) {
        yield put(failure(error));
    }
}

export default function* getTopicsTakeLatest() {
    yield takeLatest(FILTER_REPLAYS_REQUEST, getTopics)
}