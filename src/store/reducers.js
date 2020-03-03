import { combineReducers } from 'redux';

import createProject from './createProject/reducer';
import getProjects from './getProjects/reducer';
import getUsers from './getUsers/reducer';

export default combineReducers({
    createProject,
    getProjects,
    getUsers,
});
