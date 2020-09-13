import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { CREATE_REPLAY_REQUEST, success, failure } from './action';


function* createReplay({ payload }) {
    try {
        let { data } = yield call(api().post, `/replays`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi enviar seu comentário!"));
    }
}

export default function* createReplayTakeLatest() {
    yield takeLatest(CREATE_REPLAY_REQUEST, createReplay)
}