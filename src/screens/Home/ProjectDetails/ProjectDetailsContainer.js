/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import deleteProject from '~/store/deleteProject/action';
import ProjectDetails from './ProjectDetails';
import { getPath } from '~/screens/routes';
import getTopicsByProject, { GET_TOPICS_PROJECT_SUCCESS } from '~/store/getTopicsByProject/action'
import deleteTopic, { DELETE_TOPIC_SUCCESS } from '~/store/deleteTopic/action';
import { UPDATE_TOPIC_SUCCESS } from '~/store/updateTopic/action';
import { CREATE_TOPIC_SUCCESS, } from '~/store/createTopic/action';

class ProjectDetailsContainer extends Component {
    state = {
        topics: [],
    }

    componentDidMount() {
        this.onLoadTopics();
    }

    componentDidUpdate(prevProps) {
        const { topics, createTopic, deleteTopic, updateTopic } = this.props;
        (() => {
            if (topics.type === prevProps.topics.type) return;
            if (topics.type === GET_TOPICS_PROJECT_SUCCESS) {
                const { payload } = topics;
                this.setState({
                    topics: payload,
                })
            };
        })();
        (() => {
            if (createTopic.type === prevProps.createTopic.type) return;
            if (createTopic.type === CREATE_TOPIC_SUCCESS) {
                this.onLoadTopics()
            };
        })();
        (() => {
            if (deleteTopic.type === prevProps.deleteTopic.type) return;
            if (deleteTopic.type === DELETE_TOPIC_SUCCESS) {
                this.onLoadTopics()
            };
        })();
        (() => {
            if (updateTopic.type === prevProps.updateTopic.type) return;
            if (updateTopic.type === UPDATE_TOPIC_SUCCESS) {
                this.onLoadTopics()
            };
        })();

    }

    onLoadTopics = () => {
        const { project } = this.props;

        if (project && project.id) {
            this.props.dispatch(getTopicsByProject(project.id));
        }
    }

    onDeleteProject = (id) => {
        this.props.dispatch(deleteProject(id));
    }

    onDeleteTopic = (topicId) => {
        this.props.dispatch(deleteTopic(topicId));
    }

    openTopic = (topic) => () => {
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
                onDeleteTopic={this.onDeleteTopic}
                openTopic={this.openTopic}
                topics={topics}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        createTopic: state.createTopic,
        topics: state.getTopicsByProject,
        account: state.account,
        deleteTopic: state.deleteTopic,
        updateTopic: state.updateTopic,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(ProjectDetailsContainer);
