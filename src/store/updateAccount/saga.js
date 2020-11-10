import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { UPDATE_ACCOUNT_REQUEST, success, failure } from './action';


function* updateAccount({ payload }) {
    try {
        let { data } = yield call(api().patch, `/accounts/${payload.id}`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivél atualizar a conta!"));
    }
}

export default function* updateAccountTakeLatest() {
    yield takeLatest(UPDATE_ACCOUNT_REQUEST, updateAccount)
}