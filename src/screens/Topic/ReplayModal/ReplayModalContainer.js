/* eslint-disable no-sequences */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import createReplay from '~/store/createReplay/action';
import updateReplay from '~/store/updateReplay/action';
import getLastReplay, { GET_LAST_REPLAY_USER_SUCCESS } from '~/store/getLastReplayOfUser/action';
import ReplayModal from './ReplayModal';


class ReplayModalContainer extends Component {
    state = {
        lastReplayUser: null
    }

    componentDidMount() {
        this.props.dispatch(getLastReplay());
    }

    componentDidUpdate({ lastReplay }) {
        (() => {
            const { type } = this.props.lastReplay;
            if (lastReplay.type !== type) {
                if (type === GET_LAST_REPLAY_USER_SUCCESS) {
                    const { payload } = this.props.lastReplay;
                    if (payload && payload.length) {
                        this.setState({
                            lastReplayUser: payload[0],
                        })
                    }
                }
            }
        })();
    }

    onCreateReplay = (replay) => {
        const { id } = this.props.topic;
        this.props.dispatch(createReplay({ ...replay, topic: id }));
    }

    onUpdateReplay = (replay) => {
        const { id } = this.props.replay;
        this.props.dispatch(updateReplay({ ...replay, id, }));
    }

    render() {
        const { lastReplayUser } = this.state;
        return (
            <ReplayModal
                lastReplay={lastReplayUser}
                onCreateReplay={this.onCreateReplay}
                onUpdateReplay={this.onUpdateReplay}
                project={this.props.project}
                replay={this.props.replay}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        lastReplay: state.getLastReplayOfUser,
    }
}

export default connect(mapStateToProps)(ReplayModalContainer);
