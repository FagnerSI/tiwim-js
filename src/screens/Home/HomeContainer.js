/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CREATE_PROJECT_SUCCESS } from '~/store/createProject/action';
import { UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_REQUEST } from '~/store/updateProject/action';
import { DELETE_PROJECT_SUCCESS } from '~/store/deleteProject/action';
import getProjects, { GET_PROJECTS_SUCCESS } from '~/store/getProjects/action';
import getTopicsByProject from '~/store/getTopicsByProject/action';

import Home from './Home';


class HomeContainer extends Component {
    state = {
        projects: [],
        isUpdateProject: false,
    }

    componentWillMount() {
        this.onLoadProjects();
    }

    componentDidUpdate(prevProps) {
        const { projects, project, deleteProject, updateProject } = this.props;
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
                this.onLoadProjects();
            };
        })();
        (() => {
            if (updateProject.type === prevProps.updateProject.type) return;
            if (updateProject.type === UPDATE_PROJECT_REQUEST) {
                this.onLoadProjects();
                this.setState({
                    isUpdateProject: false
                })
            }
            if (updateProject.type === UPDATE_PROJECT_SUCCESS) {
                setTimeout(() => this.setState({
                    isUpdateProject: true
                }), 100)
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
        const { projects, isUpdateProject } = this.state;

        return (
            <Home
                loading={loading}
                isUpdateProject={isUpdateProject}
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
        updateProject: state.updateProject,
        deleteProject: state.deleteProject,
        topics: state.getTopicsByProject,
    }
}

export default connect(mapStateToProps)(HomeContainer);
