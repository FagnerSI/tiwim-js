import React, { Component } from 'react';
import Text from 'react-format-text';
import {
  Button,
  Tooltip,
  Spin,
  Empty,
  Modal,
  Select,
  Form,
} from 'antd';
import Search from '~/common/SearchField';
import KIND_OF_SPEECH_CHOICES from '~/common/kindSpeechsSelect';
import moment from 'moment';
import 'moment/locale/pt-br';
import { MainLayout } from '~/components';
import Replay from './Replay';
import ReplayModal from './ReplayModal';
import './style.css';

const { Option } = Select;

const initState = {
  kind_speech: undefined,
  roles_in: undefined,
  roles_for: undefined,
}
class Topic extends Component {
  state = {
    current: 0,
    visibleFilter: false,
    isFilter: false,
    ...initState,
  };

  onToggleVisibleFilter = () => {
    this.setState(
      ({ visibleFilter }) => ({ visibleFilter: !visibleFilter }))
  }

  onToggleVisibleIsFilter = () => {
    this.setState(
      ({ isFilter }) => ({
        isFilter: !isFilter,
        ...initState,
      }),
      () => {
        if (!this.state.isFilter) {
          this.props.onLoadReplays()
        }
      }
    )
  }

  onChangeValue = (field) => (e) => {
    const value = e && e.target ? e.target.value : e;
    this.setState({ [field]: value })
  }

  submitFilter = () => {
    const {
      kind_speech,
      roles_in,
      roles_for,
    } = this.state;

    this.setState({ isFilter: true })
    this.props.searchReplay(kind_speech, roles_in, roles_for);
    this.onToggleVisibleFilter();
  }

  renderLeftHeader() {
    const { history } = this.props;

    return (
      <div className='project-header'>
        <Tooltip placement="bottomLeft" title="Ir para suas Discussões">
          <Button
            type="primary"
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
      <>
        <span className="replays-title">MENSAGENS</span>
        <div className="filter">
          {
            this.state.isFilter
            && <Button
              icon="close"
              type="danger"
              onClick={this.onToggleVisibleIsFilter}
              ghost
            >
              Limpar Filtros
        </Button>
          }
          <Button
            type="primary"
            icon="filter"
            onClick={this.onToggleVisibleFilter}
            ghost
          >
            Filtrar
        </Button>
        </div>
      </>
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
            <Empty className="empty" description={this.state.isFilter ? "Não possui mensagens!" : "Esse tópico não possui mensagens!"} />
          </div>
        )
    )
  }

  rightChild() {
    const { replayActionsloading } = this.props;

    return (
      <>
        <div className="replays-container">
          {replayActionsloading
            ? <Spin size="large" />
            : this.renderReplay()
          }
          {/* <Tooltip title="Atualizar mensagem" placement="left">
            <Button
              size="large"
              type="primary"
              shape="circle"
              icon="sync"
              className="btn-sync"
              onClick={loadReplays}
            />
          </Tooltip> */}
        </div>
      </>
    )
  }

  renderForm() {
    const { roles } = this.props.project;
    const { kind_speech, roles_in, roles_for } = this.state;

    return (
      <Form colon={false}>
        <Form.Item label="Tipo de fala">
          <Select
            allowClear
            placeholder="Selecione o tipo de fala"
            onChange={this.onChangeValue('kind_speech')}
            value={kind_speech}
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) =>
              Search(input, option.props.children)
            }
          >
            {KIND_OF_SPEECH_CHOICES.map(
              item => <Option key={item.key}>{item.text}</Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="No papel">
          <Select
            allowClear
            showArrow
            placeholder="Selecione um papel"
            onChange={this.onChangeValue('roles_in')}
            value={roles_in}
            showSearch
            optionFilterProp='children'
            filterOption={(input, option) =>
              Search(input, option.props.children)
            }
          >
            {roles.map(item => <Option key={item.id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Para o papel">
          <Select
            allowClear
            showArrow
            placeholder="Selecione um papel"
            onChange={this.onChangeValue('roles_for')}
            showSearch
            value={roles_for}
            optionFilterProp='children'
            filterOption={(input, option) =>
              Search(input, option.props.children)
            }
          >
            {roles.map(item => <Option key={item.id}>{item.name}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    );
  }

  render() {
    const { topic } = this.props;
    const { visibleFilter } = this.state;
    if (!topic) return null;

    return (
      <>
        <MainLayout
          leftHeader={this.renderLeftHeader()}
          leftChild={this.renderLeftChild()}
          rightHeader={this.renderRightHeader()}
          rightChild={this.rightChild()}
        />
        <Modal
          visible={visibleFilter}
          okText="Filtrar"
          onOk={this.submitFilter}
          onCancel={this.onToggleVisibleFilter}
        >
          {this.renderForm()}
        </Modal>
      </>
    );
  }
}


export default Topic;