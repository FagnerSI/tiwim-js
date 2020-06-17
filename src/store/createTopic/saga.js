import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { CREATE_TOPIC_REQUEST, success, failure } from './action';


function* createTopic({ payload }) {
    try {
        let { data } = yield call(api().post, `/topics`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivél criar o topico!"));
    }
}

export default function* createTopicTakeLatest() {
    yield takeLatest(CREATE_TOPIC_REQUEST, createTopic)
}