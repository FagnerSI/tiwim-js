import { combineReducers } from 'redux';

import createProject from './createProject/reducer';
import createTopic from './createTopic/reducer';
import deleteProject from './deleteProject/reducer';
import getProjects from './getProjects/reducer';
import getUsers from './getUsers/reducer';

export default combineReducers({
    createProject,
    createTopic,
    deleteProject,
    getProjects,
    getUsers,
});
