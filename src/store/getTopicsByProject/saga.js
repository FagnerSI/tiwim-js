import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { GET_TOPICS_PROJECT_REQUEST, success, failure } from './action';


function* getTopics({ payload }) {
    try {
        let { data } = yield call(api().get, `/projects/${payload}/topics`);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi encontrado topicos!"));
    }
}

export default function* getTopicsTakeLatest() {
    yield takeLatest(GET_TOPICS_PROJECT_REQUEST, getTopics)
}