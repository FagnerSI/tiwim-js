/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import updateProject from '~/store/updateProject/action';
import createProject from '~/store/createProject/action';
import getUsers, { GET_USERS_SUCCESS } from '~/store/getUsers/action';
import getRoles, { GET_ROLES_SUCCESS } from '~/store/getRoles/action';
import createAccount, { CREATE_ACCOUNT_SUCCESS } from '~/store/createAccount/action';
import createRole, { CREATE_ROLE_SUCCESS } from '~/store/createRole/action';
import ProjectModal from './ProjectModal';


class ProjectModalContainer extends Component {
    state = {
        users: [],
        roles: [],
        currentRoleId: null,
        currentMemberId: null,
    }

    componentDidUpdate(prevProps) {
        const { users, roles, createRole, createAccount } = this.props;
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
                const { id } = this.props.createRole.payload;
                this.props.dispatch(getRoles());

                this.setState({
                    currentRoleId: id
                })
            };
        })();
        (() => {
            if (createAccount.type === prevProps.createAccount.type) return;
            if (createAccount.type === CREATE_ACCOUNT_SUCCESS) {
                const { id } = this.props.createAccount.payload;

                this.props.dispatch(getUsers());
                this.setState({
                    currentMemberId: id
                })
            };

        })();
    }

    onCreateRole = (roleValue) => {
        this.props.dispatch(createRole({ name: roleValue }));
    }

    onCreateAccount = (values) => {
        this.props.dispatch(createAccount(values))
    }

    onCreateProject = (project) => {
        this.props.dispatch(createProject(project));
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
        const { users, roles, currentRoleId, currentMemberId } = this.state;
        const {
            project,
            isUpdateProject,
            account
        } = this.props;
        const { loading } = this.props.roles || this.props.createAccount;

        return (
            <ProjectModal
                loading={loading}
                project={project}
                users={users}
                account={account}
                allRoles={roles}
                currentRoleId={currentRoleId}
                currentMemberId={currentMemberId}
                isUpdateProject={isUpdateProject}
                getData={this.getData}
                onCreateAccount={this.onCreateAccount}
                onCreateRole={this.onCreateRole}
                onSuccess={isUpdateProject
                    ? this.onUpdateProject
                    : this.onCreateProject}

            />
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.getUsers,
        roles: state.getRoles,
        createRole: state.createRole,
        createAccount: state.createAccount,
        account: state.account.payload,
    }
}

export default connect(mapStateToProps)(ProjectModalContainer);
