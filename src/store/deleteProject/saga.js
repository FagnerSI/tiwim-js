import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { DELETE_PROJECT_REQUEST, success, failure } from './action';


function* deleteProject({ payload }) {
    try {
        let { data } = yield call(api().delete, `/projects/${payload}`);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivél deletar o projeto!"));
    }
}

export default function* deleteProjectTakeLatest() {
    yield takeLatest(DELETE_PROJECT_REQUEST, deleteProject)
}