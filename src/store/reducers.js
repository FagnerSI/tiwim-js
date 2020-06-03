import { combineReducers } from 'redux';

import authentication from './authentication/reducer';
import createAccount from './createAccount/reducer';
import createProject from './createProject/reducer';
import createTopic from './createTopic/reducer';
import deleteProject from './deleteProject/reducer';
import getProjects from './getProjects/reducer';
import getUsers from './getUsers/reducer';

export default combineReducers({
    authentication,
    createAccount,
    createProject,
    createTopic,
    deleteProject,
    getProjects,
    getUsers,
});
