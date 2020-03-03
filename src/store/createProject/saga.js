import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { CREATE_PROJECT_REQUEST, success, failure } from './action';


function* createProject({ payload }) {
    try {
        let { data } = yield call(api.post, `/projects`, payload);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Não foi possivél criar o projeto!"));
    }
}

export default function* createProjectTakeLatest() {
    yield takeLatest(CREATE_PROJECT_REQUEST, createProject)
}