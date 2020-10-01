/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CREATE_PROJECT_SUCCESS } from '~/store/createProject/action';
import { DELETE_PROJECT_SUCCESS } from '~/store/deleteProject/action';
import getProjects, { GET_PROJECTS_SUCCESS } from '~/store/getProjects/action';
import getTopicsByProject from '~/store/getTopicsByProject/action';

import Home from './Home';


class HomeContainer extends Component {
    state = {
        projects: [],
    }

    componentWillMount() {
        this.onLoadProjects();
    }

    componentDidUpdate(prevProps) {
        const { projects, project, deleteProject } = this.props;
        (() => {
            if (projects.type === prevProps.projects.type) return;
            if (projects.type === GET_PROJECTS_SUCCESS) {
                const { payload } = projects;
                this.setState({
                    projects: payload,
                })
            };
        })();
        (() => {
            if (project.type === prevProps.project.type) return;
            if (project.type === CREATE_PROJECT_SUCCESS) {
                this.onLoadProjects()
            };
        })();
        (() => {
            if (deleteProject.type === prevProps.deleteProject.type) return;
            if (deleteProject.type === DELETE_PROJECT_SUCCESS) {
                this.onLoadProjects()
            };
        })();
    }

    onLoadProjects = () => {
        this.props.dispatch(getProjects());
    }

    getTopics = (projectId) => {
        this.props.dispatch(getTopicsByProject(projectId));
    }

    render() {
        const loading = this.props.projects.loading;
        const { projects } = this.state;

        return (
            <Home
                loading={loading}
                projects={projects}
                getTopics={this.getTopics}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        projects: state.getProjects,
        project: state.createProject,
        deleteProject: state.deleteProject,
        topics: state.getTopicsByProject,
    }
}

export default connect(mapStateToProps)(HomeContainer);
