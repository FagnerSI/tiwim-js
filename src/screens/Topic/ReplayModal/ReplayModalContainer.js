/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import createReplay from '~/store/createReplay/action';
import updateReplay from '~/store/updateReplay/action';
import ReplayModal from './ReplayModal';


class ReplayModalContainer extends Component {
    onCreateReplay = (replay) => {
        const { id } = this.props.topic;
        this.props.dispatch(createReplay({ ...replay, topic: id }));
    }

    onUpdateReplay = (replay) => {
        const { id } = this.props.replay;
        this.props.dispatch(updateReplay({ ...replay, id, }));
    }

    render() {
        return (
            <ReplayModal
                onCreateReplay={this.onCreateReplay}
                onUpdateReplay={this.onUpdateReplay}
                project={this.props.project}
                replay={this.props.replay}
            />
        );
    }
}

export default connect()(ReplayModalContainer);
