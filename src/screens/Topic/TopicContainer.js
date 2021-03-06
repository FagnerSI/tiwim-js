import React, { Component } from 'react';
import Topic from './Topic';
import { connect } from 'react-redux';
import getReplays, { GET_REPLAYS_TOPIC_SUCCESS } from '~/store/getReplaysOfTopic/action';
import deleteReplay, { DELETE_REPLAY_SUCCESS } from '~/store/deleteReplay/action';
import { CREATE_REPLAY_SUCCESS } from '~/store/createReplay/action';
import { UPDATE_REPLAY_SUCCESS } from '~/store/updateReplay/action';
import findReplays, { FILTER_REPLAYS_SUCCESS } from '~/store/filterReplaysOfTopic/action';


class TopicContainer extends Component {
    state = {
        replays: [],
    }

    componentWillMount() {
        this.loadReplays();
    }

    componentDidUpdate({
        replays,
        createReplay,
        removeReplay,
        updateReplay,
        filter,
    }) {
        (() => {
            const { type } = this.props.replays;
            if (replays.type !== type) {
                if (type === GET_REPLAYS_TOPIC_SUCCESS) {
                    this.setState({ replays: this.props.replays.payload })
                }
            }
        })();
        (() => {
            const { type } = this.props.filter;

            if (filter.type !== type) {
                if (type === FILTER_REPLAYS_SUCCESS) {
                    this.setState({ replays: this.props.filter.payload })
                }
            }
        })();
        (() => {
            const { type } = this.props.createReplay;
            if (createReplay.type !== type) {
                if (type === CREATE_REPLAY_SUCCESS) {
                    this.loadReplays()
                }
            }
        })();
        (() => {
            const { type } = this.props.removeReplay;
            if (removeReplay.type !== type) {
                if (type === DELETE_REPLAY_SUCCESS) {
                    this.loadReplays()
                }
            }
        })();
        (() => {
            const { type } = this.props.updateReplay;
            if (updateReplay.type !== type) {
                if (type === UPDATE_REPLAY_SUCCESS) {
                    this.loadReplays()
                }
            }
        })();
    }

    searchReplay = (kind_speech, roles_in, roles_for) => {
        const { topic, dispatch } = this.props;
        dispatch(
            findReplays({
                id: topic.id,
                kind_speech,
                roles_in,
                roles_for
            })
        );
    }

    loadReplays = () => {
        const { topic, dispatch } = this.props;
        dispatch(getReplays(topic.id));
    }

    removeReplay = (item) => () => {
        this.props.dispatch(deleteReplay(item))
    }

    render() {
        const replayActionsloading = this.props.removeReplay.loading
            || this.props.createReplay.loading
            || this.props.updateReplay.loading
            || this.props.replays.loading

        return (
            <Topic
                {...this.props}
                replayActionsloading={replayActionsloading}
                replays={this.state.replays}
                onLoadReplays={this.loadReplays}
                searchReplay={this.searchReplay}
                removeReplay={this.removeReplay}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        replays: state.getReplaysOfTopic,
        updateReplay: state.updateReplay,
        removeReplay: state.deleteReplay,
        createReplay: state.createReplay,
        account: state.account,
        filter: state.filterReplaysOfTopic
    }
}

export default connect(mapStateToProps)(TopicContainer);