import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { AUTHENTICATION_REQUEST, success, failure } from './action';


function* login({ payload }) {
    try {
        let { data } = yield call(api.post, `/accounts/login`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivel fazer login!"));
    }
}

export default function* createLoginTakeLatest() {
    yield takeLatest(AUTHENTICATION_REQUEST, login)
}