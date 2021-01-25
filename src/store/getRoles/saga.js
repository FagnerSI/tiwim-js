import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { GET_ROLES_REQUEST, success, failure } from './action';


function* getRoles() {
    try {
        let { data } = yield call(api().get, `/roles`);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Erro ou tentar encontrar papéis!"));
    }
}

export default function* getRolesTakeLatest() {
    yield takeLatest(GET_ROLES_REQUEST, getRoles)
}