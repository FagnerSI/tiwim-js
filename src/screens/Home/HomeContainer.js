/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import createProject, { CREATE_PROJECT_SUCCESS } from '~/store/createProject/action';
import getProjects, { GET_PROJECTS_SUCCESS } from '~/store/getProjects/action';
import getUsers, { GET_USERS_SUCCESS } from '~/store/getUsers/action';
import { message } from 'antd';
import Home from './Home';

import api from '~/services/api';


class HomeContainer extends Component {

    state = {
        projects: [],
        users: [],
        project: null,
    }

    componentWillMount() {
        this.onLoadProjects();
    }

    componentDidUpdate(prevProps) {
        const { projects, users, project } = this.props;
        (() => {
            if (projects.type === prevProps.projects.type) return;
            if (projects.type === GET_PROJECTS_SUCCESS) {
                const { payload } = projects;
                this.setState({
                    projects: payload,
                    project: payload[0],
                })
            };
        })();

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
            if (project.type === prevProps.project.type) return;
            if (project.type === CREATE_PROJECT_SUCCESS) {
                this.onLoadProjects(this.state.projects.length)
            };
        })();
    }

    onLoadProjects = (index = 0) => {
        this.props.dispatch(getProjects());
    }

    onSelectProject = (id) => {
        const { projects } = this.state;
        this.setState({
            project: projects[id]
        })
    }

    onLoadUsers = () => {
        this.props.dispatch(getUsers());
    }

    onCreateProject = (project) => {
        this.props.dispatch(createProject(project));
    }

    onDeleteProject = async () => {
        try {
            await api.delete(`/projects/${this.state.project.id}`);
            message.success('Projeto removido com sucesso.');
            this.loadProjects();
        }
        catch {
            message.error('Erro ao tentar remover projeto');
        }
    }

    onCreateTopic = async (topic) => {
        try {
            const newTopic = {
                project: this.state.project.id,
                ...topic,
            };
            await api.post(`/topics`, newTopic);
            message.success('Topico criado com sucesso.');
        } catch {
            message.error('Erro ao tentar criar topico.');
        }
    }

    render() {
        const loading = this.props.projects.loading;
        return (
            <Home
                {...this.state}
                loading={loading}
                onSelectProject={this.onSelectProject}
                onCreateProject={this.onCreateProject}
                onDeleteProject={this.onDeleteProject}
                onCreateTopic={this.onCreateTopic}
                loadUsers={this.onLoadUsers}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        projects: state.getProjects,
        users: state.getUsers,
        project: state.createProject,
    }
}

export default connect(mapStateToProps)(HomeContainer);
