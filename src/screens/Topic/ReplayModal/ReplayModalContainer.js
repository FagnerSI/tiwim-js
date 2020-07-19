/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import createReplay from '~/store/createReplay/action';
import ReplayModal from './ReplayModal';


class ReplayModalContainer extends Component {
    onCreateReplay = (replay) => {
        const { topic } = this.props;
        this.props.dispatch(createReplay({ ...replay, topic: topic.id }));
    }

    render() {

        return (
            <ReplayModal
                onCreateReplay={this.onCreateReplay}
                project={this.props.project}
            />
        );
    }
}

export default connect()(ReplayModalContainer);
