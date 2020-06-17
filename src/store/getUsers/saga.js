import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { GET_USERS_REQUEST, success, failure } from './action';


function* getUsers() {
    try {
        let { data } = yield call(api().get, `/accounts`);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Nenhum usuário foi encontrado!"));
    }
}

export default function* getUsersTakeLatest() {
    yield takeLatest(GET_USERS_REQUEST, getUsers)
}