import React, { Component } from 'react';
import { message } from 'antd';
import Main from './Main';

import api from '~/services/api';

// import { Container } from './styles';

export default class MainContainer extends Component {

    state = {
        project: null,
        projects: [],
        users: [],
    }

    componentDidMount() {
        this.loadProjects();
    }

    loadProjects = async () => {

        const response = await api.get('/projects');
        this.setState({
            projects: response.data,
            project: response.data[0],
        })
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
        try {
            await api.post(`/projects`, project);
            message.success('Projeto criado com sucesso.');
            this.loadProjects();
        } catch {
            message.error('Erro ao tentar criar projeto');
        }

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

    render() {
        return (
            <Main
                {...this.state}
                onSelectProject={this.onSelectProject}
                onCreateProject={this.onCreateProject}
                onDeleteProject={this.onDeleteProject}
                loadUsers={this.loadUsers}
            />
        );
    }
}
