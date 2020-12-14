import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { DELETE_REPLAY_REQUEST, success, failure } from './action';


function* deleteReplay({ payload }) {
    try {
        let { data } = yield call(api().delete, `/replays/${payload}`);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi remover a mensagem!"));
    }
}

export default function* deleteReplayTakeLatest() {
    yield takeLatest(DELETE_REPLAY_REQUEST, deleteReplay)
}