/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';

import updateProject from '~/store/updateProject/action';
import createProject from '~/store/createProject/action';
import getUsers, { GET_USERS_SUCCESS } from '~/store/getUsers/action';
import getRoles, { GET_ROLES_SUCCESS } from '~/store/getRoles/action';
import createRole, { CREATE_ROLE_SUCCESS } from '~/store/createRole/action';
import ProjectModal from './ProjectModal';


class ProjectModalContainer extends Component {
    state = {
        users: [],
        roles: [],
        currentRoleId: null,
    }

    componentDidUpdate(prevProps) {
        const { users, roles, createRole } = this.props;
        (() => {
            if (users.type === prevProps.users.type) return;
            if (users.type === GET_USERS_SUCCESS) {
                const { payload } = users;
                this.setState({
                    users: payload,
                })
            };
        })();
        (() => {
            if (roles.type === prevProps.roles.type) return;
            if (roles.type === GET_ROLES_SUCCESS) {
                const { payload } = roles;
                this.setState({
                    roles: payload,
                })
            };
        })();
        (() => {
            if (createRole.type === prevProps.createRole.type) return;
            if (createRole.type === CREATE_ROLE_SUCCESS) {
                this.props.dispatch(getRoles());
                const { id } = this.props.createRole.payload;

                this.setState({
                    currentRoleId: id
                })
            };
        })();
    }

    onCreateProject = (project) => {
        this.props.dispatch(createProject(project));
    }

    onCreateRole = (roleValue) => {
        this.props.dispatch(createRole({ name: roleValue }));
    }

    onUpdateProject = (project) => {
        const { id } = this.props.project;
        this.props.dispatch(updateProject({ ...project, id }));
    }

    getData = () => {
        this.props.dispatch(getUsers())
        this.props.dispatch(getRoles());
    };

    render() {
        const { users, roles, currentRoleId } = this.state;
        const {
            project,
            isUpdateProject,
            account
        } = this.props;
        const { loading } = this.props.roles;

        return (
            <ProjectModal
                loading={loading}
                currentRoleId={currentRoleId}
                users={users}
                allRoles={roles}
                getData={this.getData}
                onCreateRole={this.onCreateRole}
                onCreateProject={this.onCreateProject}
                onUpdateProject={this.onUpdateProject}
                isUpdateProject={isUpdateProject}
                project={project}
                account={account}

            />
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.getUsers,
        roles: state.getRoles,
        createRole: state.createRole,
        account: state.account.payload,
    }
}

export default connect(mapStateToProps)(ProjectModalContainer);
