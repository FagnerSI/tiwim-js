import { combineReducers } from 'redux';

import createProject from './createProject/reducer';
import deleteProject from './deleteProject/reducer';
import getProjects from './getProjects/reducer';
import getUsers from './getUsers/reducer';

export default combineReducers({
    createProject,
    deleteProject,
    getProjects,
    getUsers,
});
