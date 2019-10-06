import React, { Component } from 'react';

import Main from './Main';

import api from '~/services/api';

// import { Container } from './styles';

export default class MainContainer extends Component {

    state = {
        project: {},
        projects: [],
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

    onSelectProject = async (id) => {
        const { projects } = this.state;
        this.setState({
            project: projects[id]
        })
    }

    onDeleteProject = async () => {
        const response = await api.delete(`/projects/${this.state.project.id}`);
        if (response) this.loadProjects();
    }

    render() {

        return (
            <Main
                {...this.state}
                onSelectProject={this.onSelectProject}
                onDeleteProject={this.onDeleteProject}
            />
        );
    }
}
