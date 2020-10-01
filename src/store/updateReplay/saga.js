import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { UPDATE_REPLAY_REQUEST, success, failure } from './action';


function* updateReplay({ payload }) {
    try {
        let { data } = yield call(api().patch, `/replays/${payload.id}`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivél atualizar o comentário!"));
    }
}

export default function* updateReplayTakeLatest() {
    yield takeLatest(UPDATE_REPLAY_REQUEST, updateReplay)
}