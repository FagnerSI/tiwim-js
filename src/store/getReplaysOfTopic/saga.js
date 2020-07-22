import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { GET_REPLAYS_TOPIC_REQUEST, success, failure } from './action';


function* getReplays({ payload }) {
    try {
        let { data } = yield call(api().get, `/topics/${payload}/replays`);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi encontrado respostas para esse tópico!"));
    }
}

export default function* getReplaysTakeLatest() {
    yield takeLatest(GET_REPLAYS_TOPIC_REQUEST, getReplays)
}