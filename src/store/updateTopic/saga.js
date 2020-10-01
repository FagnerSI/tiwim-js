import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { UPDATE_TOPIC_REQUEST, success, failure } from './action';


function* updateTopic({ payload }) {
    try {
        let { data } = yield call(api().patch, `/topics/${payload.id}`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivél atualizar o tópico!"));
    }
}

export default function* updateTopicTakeLatest() {
    yield takeLatest(UPDATE_TOPIC_REQUEST, updateTopic)
}