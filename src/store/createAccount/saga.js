import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { CREATE_ACCOUNT_REQUEST, success, failure } from './action';


function* createAccount({ payload }) {
    try {
        let { data } = yield call(api().post, `/accounts`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivél criar sua conta!"));
    }
}

export default function* createAccountTakeLatest() {
    yield takeLatest(CREATE_ACCOUNT_REQUEST, createAccount)
}