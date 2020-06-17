/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import createTopic from '~/store/createTopic/action';
import deleteProject from '~/store/deleteProject/action';
import ProjectDetails from './ProjectDetails';


class ProjectDetailsContainer extends Component {

    onDeleteProject = (id) => {
        this.props.dispatch(deleteProject(id));
    }

    onCreateTopic = (topic) => {
        const newTopic = {
            project: this.state.project.id,
            ...topic,
        };
        this.props.dispatch(createTopic(newTopic));
    }

    render() {

        return (
            <ProjectDetails
                project={this.props.project}
                onDeleteProject={this.onDeleteProject}
                onCreateTopic={this.onCreateTopic}
            />
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(ProjectDetailsContainer);
