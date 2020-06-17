import { takeLatest, call, put } from "redux-saga/effects";
import api from '~/services/api';

import { GET_PROJECTS_REQUEST, success, failure } from './action';


function* getProjects() {
    try {
        let { data } = yield call(api().get, `/projects`);
        yield put(success(data));
    } catch (error) {
        yield put(failure("Nenhum Projeto foi encontrado!"));
    }
}

export default function* getProjectsTakeLatest() {
    yield takeLatest(GET_PROJECTS_REQUEST, getProjects)
}