/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import createTopic from '~/store/createTopic/action';
import updateTopic from '~/store/updateTopic/action';

import TopicModal from './TopicModal';


class TopicModalContainer extends Component {
    onCreateTopic = (topic) => {
        const newTopic = {
            project: this.props.project.id,
            ...topic,
        };
        this.props.dispatch(createTopic(newTopic));
    }

    onUpdateTopic = (topic) => {
        const { id } = this.props.topic;
        this.props.dispatch(updateTopic({ ...topic, id, }));
    }

    render() {
        return (
            <TopicModal
                onCreateTopic={this.onCreateTopic}
                onUpdateTopic={this.onUpdateTopic}
                project={this.props.project}
                topic={this.props.topic}
                account={this.props.account.payload}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
    }
}

export default connect(mapStateToProps)(TopicModalContainer);