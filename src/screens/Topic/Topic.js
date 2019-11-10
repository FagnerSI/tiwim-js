import React, { Component } from 'react';
import Text from 'react-format-text';
import { Divider } from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Button, Header, MainLayout } from '~/components';
import Replay from './Replay';
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
        <Button
          placement="bottomLeft"
          tooltipTitle="Ir para Home"
          btnType="primary"
          styleComponent="btn-primary"
          icon="arrow-left"
          onClick={history.goBack}
        />
        <span style={{ padding: "0 10px" }}>Voltar</span>
      </div>
    );
  }

  renderLeftChild() {
    const { title, description, created_at } = this.props.topic;
    return (
      <div className="topic-details">
        <span className="topic-title">{title}</span>
        <span className="date"> {`Criado em ${moment(created_at).format('DD/MM/YYYY')}`}</span>
        <div className="topic-desc">
          <Text>{description}</Text>
        </div>
      </div>
    )
  }

  renderRightHeader() {
    return (
      <Header />
    )
  }

  rightChild() {
    const { replays } = this.props.topic;

    return (
      <div>
        <Divider orientation="left"><span className="replays-title">Respostas</span></Divider>
        {
          replays
          && (replays.map(replay => <Replay replay={replay} />))
        }

        <Button
          placement="bottomLeft"
          tooltipTitle="Novo Projeto"
          btnType="primary"
          styleComponent="btn-primary btn-new-replay"
          icon="plus"
          onClick={this.onToggleModal}
        />
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