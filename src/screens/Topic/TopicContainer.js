import React, { Component } from 'react';
import Topic from './Topic';

import api from '~/services/api';

export default class TopicContainer extends Component {

    state = {
        topic: {},
        loading: true,
    }

    componentWillMount() {
        this.loadTopic();
    }

    loadTopic = async () => {
        const { id } = this.props.match.params;
        try {
            const response = await api.get(`/topics/${id}`);
            this.setState({
                topic: response.data,
                loading: false,
            });
        } catch{ }
    }

    render() {
        return (
            <Topic
                {...this.state}
                {...this.props}
            />
        );
    }
}
