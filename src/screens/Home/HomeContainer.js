import React, { Component } from 'react';
import { message } from 'antd';
import Home from './Home';

import api from '~/services/api';

export default class HomeContainer extends Component {

    state = {
        project: null,
        projects: [],
        users: [],
    }

    componentWillMount() {
        this.loadProjects();
    }

    loadProjects = async (index = 0) => {

        const response = await api.get('/projects');
        this.setState({
            projects: response.data,
            project: response.data[index],
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
        return (
            <Home
                {...this.state}
                onSelectProject={this.onSelectProject}
                onCreateProject={this.onCreateProject}
                onDeleteProject={this.onDeleteProject}
                onCreateTopic={this.onCreateTopic}
                loadUsers={this.loadUsers}
            />
        );
    }
}
