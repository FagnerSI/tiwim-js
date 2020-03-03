import { all } from 'redux-saga/effects';

import createProject from './createProject/saga';
import createTopic from './createTopic/saga';
import deleteProject from './deleteProject/saga';
import getProjects from './getProjects/saga';
import getUsers from './getUsers/saga';

export default function* rootSaga() {
    yield all([
        createProject(),
        createTopic(),
        deleteProject(),
        getProjects(),
        getUsers(),
    ]);
}
