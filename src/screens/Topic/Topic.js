import React, { Component } from 'react';
import Text from 'react-format-text';
import {
  Button,
  Icon,
} from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br';
import Header from '~/components/Header';
import MainLayout from '~/components/MainLayout';
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
          type="primary"
          className="btn-primary"
          onClick={history.goBack}
        >
          <Icon type="arrow-left" />
        </Button>
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

  render() {
    const { topic } = this.props;
    if (!topic) return null;
    return (
      <MainLayout
        leftHeader={this.renderLeftHeader()}
        leftChild={this.renderLeftChild()}
        rightHeader={this.renderRightHeader()}
      /* rightChild={this.renderRightChild()} */
      />
    );
  }
}
export default Topic;