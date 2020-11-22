import React, { Component } from 'react';
import Text from 'react-format-text';
import { Button, Tooltip, Spin, Empty } from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Header, MainLayout, } from '~/components';
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
        <Tooltip placement="bottomLeft" title="Ir para Projetos">
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
        <span className="date"> {`criado em ${moment(created_at).format('DD/MM/YYYY')}`}</span>
        {
          description &&
          <div className="topic-desc">
            <Text>{description}</Text>
          </div>
        }
        <div className="container-replay-modal">
          <ReplayModal project={project} topic={topic} />
        </div>
      </div>
    )
  }

  renderRightHeader() {
    return (
      <Header />
    )
  }

  renderReplay() {
    const {
      project,
      topic,
      replays,
      account,
      removeReplay
    } = this.props;

    return (
      replays && replays.length
        ? replays.map(replay => (
          <Replay
            project={project}
            topic={topic}
            replay={replay}
            removeReplay={removeReplay}
            account={account.payload}
          />
        ))
        : (
          <div className="empty-container">
            <Empty className="empty" description="Esse tópico não possui comentários!" />
          </div>
        )
    )
  }

  rightChild() {
    const { loadReplays, deleteReplayloading } = this.props;

    return (
      <>
        <span className="replays-title">COMENTÁRIOS</span>
        <div className="replays-container">
          {deleteReplayloading
            ? <Spin size="large" />
            : this.renderReplay()
          }
          <Tooltip title="Atualizar comentários" placement="left">
            <Button
              size="large"
              type="primary"
              shape="circle"
              icon="sync"
              className="btn-sync"
              onClick={loadReplays}
            />
          </Tooltip>
        </div>
      </>
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