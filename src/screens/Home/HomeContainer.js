/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import getProjects, { GET_PROJECTS_SUCCESS } from '~/store/getProjects/action';
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
        const { projects } = this.props;
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
    }

    onLoadProjects = (index = 0) => {
        this.props.dispatch(getProjects());
    }

    loadUsers = async () => {
        const response = await api.get('/users');
        this.setState({
            users: response.data,
        })
    }

    onSelectProject = (id) => {
        const { projects } = this.state;
        this.setState({
            project: projects[id]
        })
    }

    onCreateProject = async (project) => {
        await api.post(`/projects`, project)
            .then(
                (result) => (
                    message.success('Projeto criado com sucesso.'),
                    this.onLoadProjects(this.state.projects.length)
                ),
                (result, error) => (message.error('Erro ao tentar criar projeto')),
            )
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
                loadUsers={this.loadUsers}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        projects: state.getProjects,
    }
}

export default connect(mapStateToProps)(HomeContainer);
