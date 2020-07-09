import { combineReducers } from 'redux';

import account from './account/reducer';
import authentication from './authentication/reducer';
import createAccount from './createAccount/reducer';
import createProject from './createProject/reducer';
import createTopic from './createTopic/reducer';
import getTopicsByProject from './getTopicsByProject/reducer';
import deleteProject from './deleteProject/reducer';
import deleteTopic from './deleteTopic/reducer';
import getProjects from './getProjects/reducer';
import getUsers from './getUsers/reducer';

export default combineReducers({
    account,
    authentication,
    createAccount,
    createProject,
    createTopic,
    deleteProject,
    deleteTopic,
    getTopicsByProject,
    getProjects,
    getUsers,
});
