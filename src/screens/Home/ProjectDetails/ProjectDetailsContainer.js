/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import createTopic from '~/store/createTopic/action';
import deleteProject from '~/store/deleteProject/action';
import ProjectDetails from './ProjectDetails';
import { getPath } from '~/screens/routes';

import getTopicsByProject, { GET_TOPICS_PROJECT_SUCCESS } from '~/store/getTopicsByProject/action'
import deleteTopic from '~/store/deleteTopic/action';


class ProjectDetailsContainer extends Component {
    state = {
        topics: [],
    }

    componentDidMount() {
        const { project } = this.props;

        if (project && project.id) {
            this.props.dispatch(getTopicsByProject(project.id));
        }
    }

    componentDidUpdate(prevProps) {
        const { topics } = this.props;
        (() => {
            if (topics.type === prevProps.topics.type) return;
            if (topics.type === GET_TOPICS_PROJECT_SUCCESS) {
                const { payload } = topics;
                this.setState({
                    topics: payload,
                })
            };
        })();
    }

    onDeleteProject = (id) => {
        this.props.dispatch(deleteProject(id));
    }

    onCreateTopic = (topic) => {
        const newTopic = {
            project: this.props.project.id,
            ...topic,
        };
        this.props.dispatch(createTopic(newTopic));
    }

    onDeleteTopic = (topicId) => {
        this.props.dispatch(deleteTopic(topicId));
    }

    openTopic = (topic) => {
        this.props.history.push(
            getPath('Topic', [topic.id]),
            {
                project: this.props.project,
                topic,
            }
        );
    }

    render() {
        const loading = this.props.createTopic.loading || this.props.topics.loading;
        const account = this.props.account.payload;
        const { topics } = this.state;
        return (
            <ProjectDetails
                loading={loading}
                account={account}
                project={this.props.project}
                onDeleteProject={this.onDeleteProject}
                onCreateTopic={this.onCreateTopic}
                onDeleteTopic={this.onDeleteTopic}
                openTopic={this.openTopic}
                topics={topics.reverse()}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        createTopic: state.createTopic,
        topics: state.getTopicsByProject,
        account: state.account,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(ProjectDetailsContainer);
