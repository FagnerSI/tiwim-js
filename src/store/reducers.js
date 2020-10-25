import { combineReducers } from 'redux';

import account from './account/reducer';
import authentication from './authentication/reducer';
import createAccount from './createAccount/reducer';
import createProject from './createProject/reducer';
import createReplay from './createReplay/reducer';
import createRole from './createRole/reducer';
import createTopic from './createTopic/reducer';
import getReplaysOfTopic from './getReplaysOfTopic/reducer';
import getTopicsByProject from './getTopicsByProject/reducer';
import deleteProject from './deleteProject/reducer';
import deleteTopic from './deleteTopic/reducer';
import deleteReplay from './deleteReplay/reducer';
import getProjects from './getProjects/reducer';
import getRoles from './getRoles/reducer';
import getUsers from './getUsers/reducer';
import updateProject from './updateProject/reducer';
import updateReplay from './updateReplay/reducer';
import updateTopic from './updateTopic/reducer';

export default combineReducers({
    account,
    authentication,
    createAccount,
    createProject,
    createRole,
    createTopic,
    deleteProject,
    createReplay,
    deleteTopic,
    deleteReplay,
    getReplaysOfTopic,
    getTopicsByProject,
    getProjects,
    getRoles,
    getUsers,
    updateProject,
    updateReplay,
    updateTopic,
});
