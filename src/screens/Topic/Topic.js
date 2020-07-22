import React, { Component } from 'react';
import Text from 'react-format-text';
import { Button, Divider, Tooltip } from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Header, MainLayout } from '~/components';
import Replay from './Replay';
import ReplayModal from './ReplayModal';
import './style.css';

class Topic extends Component {
  state = {
    current: 0,
    visible: false,
  };

  renderLeftHeader() {
    const { history } = this.props;

    return (
      <div className='project-header'>
        <Tooltip placement="bottomLeft" title="Ir para Home">
          <Button
            type="primary"
            className="btn-circle-icon"
            icon="arrow-left"
            onClick={history.goBack}
          />
        </Tooltip>
        <span style={{ padding: "0 10px" }}>Voltar</span>
      </div>
    );
  }

  renderLeftChild() {
    const { project, topic } = this.props;
    const { title, description, created_at } = topic;
    return (
      <div className="topic-details">
        <span className="topic-title">{title}</span>
        <span className="date"> {`Criado em ${moment(created_at).format('DD/MM/YYYY')}`}</span>
        <div className="topic-desc">
          <Text>{description}</Text>
        </div>
        <ReplayModal project={project} topic={topic} />
      </div>
    )
  }

  renderRightHeader() {
    return (
      <Header />
    )
  }

  rightChild() {
    const { replays } = this.props;

    return (
      <div className="replays-container">
        <Divider orientation="left"><span className="replays-title">Respostas</span></Divider>
        {
          replays.map(replay => <Replay replay={replay} />)
        }

      </div>
    )
  }

  render() {
    const { topic, loading } = this.props;
    if (!topic) return null;

    return (
      <MainLayout
        leftHeader={this.renderLeftHeader()}
        leftChild={this.renderLeftChild()}
        rightHeader={this.renderRightHeader()}
        rightChild={this.rightChild()}
        loading={loading}
      />
    );
  }
}


export default Topic;