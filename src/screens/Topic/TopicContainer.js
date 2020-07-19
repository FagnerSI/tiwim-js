import React, { Component } from 'react';
import Topic from './Topic';
import { connect } from 'react-redux';
import getReplays, { GET_REPLAYS_TOPIC_SUCCESS } from '~/store/getReplaysOfTopic/action';
import { CREATE_REPLAY_SUCCESS } from '~/store/createReplay/action';

class TopicContainer extends Component {
    state = {
        replays: [],
    }

    componentWillMount() {
        this.loadReplays();
    }

    componentDidUpdate({ replays, createReplay }) {
        (() => {
            if (replays.type !== this.props.replays.type) {
                if (this.props.replays.type === GET_REPLAYS_TOPIC_SUCCESS) {
                    this.setState({ replays: this.props.replays.payload })
                }

            }
        })();
        (() => {
            if (createReplay.type !== this.props.createReplay.type) {
                if (this.props.createReplay.type === CREATE_REPLAY_SUCCESS) {
                    this.loadReplays()
                }

            }
        })();
    }

    loadReplays = () => {
        const { topic, dispatch } = this.props;
        dispatch(getReplays(topic.id));
    }

    /* loadTopic = async () => {
        const { id } = this.props.match.params;
        try {
            const response = await api().get(`/topics/${id}`);
            this.setState({
                topic: response.data,
                loading: false,
            });
        } catch{ }
    } */

    render() {
        const { loading } = this.props.replays
        return (
            <Topic
                {...this.props}
                loading={loading}
                replays={this.state.replays}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        replays: state.getReplaysOfTopic,
        createReplay: state.createReplay,
    }
}

export default connect(mapStateToProps)(TopicContainer);