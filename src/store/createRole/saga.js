import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { CREATE_ROLE_REQUEST, success, failure } from './action';


function* createRoles({ payload }) {
    try {
        let { data } = yield call(api().post, `/roles`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Falha ao tentar criar o papel!"));
    }
}

export default function* createRolesTakeLatest() {
    yield takeLatest(CREATE_ROLE_REQUEST, createRoles)
}