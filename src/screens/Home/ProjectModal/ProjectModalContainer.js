/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';

import createProject from '~/store/createProject/action';
import getUsers, { GET_USERS_SUCCESS } from '~/store/getUsers/action';
import ProjectModal from './ProjectModal';


class ProjectModalContainer extends Component {
    state = {
        users: [],
    }

    componentDidUpdate(prevProps) {
        const { users } = this.props;
        (() => {
            if (users.type === prevProps.users.type) return;
            if (users.type === GET_USERS_SUCCESS) {
                const { payload } = users;
                this.setState({
                    users: payload,
                })
            };
        })();
    }

    onCreateProject = (project) => {
        this.props.dispatch(createProject(project));
    }

    getUsers = () => this.props.dispatch(getUsers());

    render() {
        const { users } = this.state;

        return (
            <ProjectModal
                users={users}
                getUsers={this.getUsers}
                onCreateProject={this.onCreateProject}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.getUsers,
        project: state.createProject,
    }
}

export default connect(mapStateToProps)(ProjectModalContainer);
