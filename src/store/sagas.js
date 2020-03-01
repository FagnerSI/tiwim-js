import { all } from 'redux-saga/effects';
import getProjects from './getProjects/saga';

export default function* rootSaga() {
    yield all([
        getProjects(),
    ]);
}
