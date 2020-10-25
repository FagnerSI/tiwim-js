import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { UPDATE_PROJECT_REQUEST, success, failure } from './action';


function* updateProject({ payload }) {
    try {
        let { data } = yield call(api().patch, `/projects/${payload.id}`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivél atualizar o projeto!"));
    }
}

export default function* updateProjectTakeLatest() {
    yield takeLatest(UPDATE_PROJECT_REQUEST, updateProject)
}