import { all } from 'redux-saga/effects';

import authentication from './authentication/saga';
import createAccount from './createAccount/saga';
import createProject from './createProject/saga';
import createTopic from './createTopic/saga';
import deleteProject from './deleteProject/saga';
import createReplay from './createReplay/saga';
import createRole from './createRole/saga';
import deleteTopic from './deleteTopic/saga';
import deleteReplay from './deleteReplay/saga';
import getReplaysOfTopic from './getReplaysOfTopic/saga';
import getTopictsProject from './getTopicsByProject/saga';
import getProjects from './getProjects/saga';
import getUsers from './getUsers/saga';
import getRoles from './getRoles/saga';
import updateProject from './updateProject/saga';
import updateAccount from './updateAccount/saga';
import updateReplay from './updateReplay/saga';
import updateTopic from './updateTopic/saga';
import getLastReplayOfUser from './getLastReplayOfUser/saga';

export default function* rootSaga() {
    yield all([
        authentication(),
        createAccount(),
        createProject(),
        createTopic(),
        createReplay(),
        createRole(),
        deleteReplay(),
        getReplaysOfTopic(),
        deleteProject(),
        deleteTopic(),
        getProjects(),
        getUsers(),
        getTopictsProject(),
        getRoles(),
        updateAccount(),
        updateProject(),
        updateReplay(),
        updateTopic(),
        getLastReplayOfUser(),
    ]);
}
