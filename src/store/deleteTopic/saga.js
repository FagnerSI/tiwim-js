import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { DELETE_TOPIC_REQUEST, success, failure } from './action';


function* deleteTopic({ payload }) {
    try {
        let { data } = yield call(api().delete, `/topics/${payload}`);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivél deletar o topico!"));
    }
}

export default function* deleteTopicTakeLatest() {
    yield takeLatest(DELETE_TOPIC_REQUEST, deleteTopic)
}