import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { GET_LAST_REPLAY_USER_REQUEST, success, failure } from './action';


function* getTopics({ payload }) {
    try {
        let { data } = yield call(api().get, `/topics/${payload}/last_replay_of_user`);
        yield put(success(data));
    } catch (error) {
        yield put(failure(error));
    }
}

export default function* getTopicsTakeLatest() {
    yield takeLatest(GET_LAST_REPLAY_USER_REQUEST, getTopics)
}