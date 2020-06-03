import React, { Component } from 'react';
import {
  Empty,
  Input,
  Menu,
  Modal,
  Select,
} from 'antd';

import ProjectDetails from './ProjectDetails';
import MainLayout from '~/components/MainLayout';
import { Button, Header } from '~/components';
import './style.css';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const { Option } = Select;

type Props = {
  onloadProject: () => void,
  onCreateProject: () => void,
}

class Home extends Component<Props> {
  state = {
    current: '0',
    visible: false,
  };

  onToggleModal = () => {
    const { visible } = this.state;
    !visible && this.props.loadUsers();
    this.setState({
      visible: !visible,
    });
  };

  onSelectProject = e => {
    this.setState({
      current: e.key,
    });
    this.props.onSelectProject(e.key)
  };

  onDeleteProject = () => {
    this.setState({
      current: '0',
    });
    this.props.onDeleteProject()
  }

  onChangeName(name) {
    this.setState({
      name
    })
  }

  onChangeDesc(description) {
    this.setState({
      description
    })
  }

  onChangeSelect = (members) => {
    this.setState({
      members
    })
  }

  onCreateProject = () => {
    const { name, description, members } = this.state;
    this.props.onCreateProject({ name, description, members })
    this.onToggleModal();
    this.setState({
      current: `${this.props.projects.length}`,
    });
  }

  renderLeftHeader() {
    return (
      <div className='project-header'>
        <Button
          placement="bottomLeft"
          tooltipTitle="Novo Projeto"
          btnType="primary"
          className="btn-circle-icon"
          icon="plus"
          onClick={this.onToggleModal}
        />
        <span style={{ padding: "0 10px" }}>Projetos</span>
      </div>
    );
  }

  renderLeftChild() {
    const { projects } = this.props;
    return (
      <Menu
        onClick={this.onSelectProject}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        {
          projects && projects.length
            ? (
              projects.map((project, index) => (
                <Menu.Item key={index}>{project.name}</Menu.Item>
              ))
            )
            : <Empty style={{ padding: '50px 0' }} description="Você não possui projetos." />
        }
      </Menu>
    )
  }

  renderRightHeader() {
    return (
      <Header />
    )
  }

  renderRightChild() {
    const { users, project } = this.props;
    return (
      <>
        {
          project && (
            <ProjectDetails
              project={project}
              users={users}
              onDelete={this.onDeleteProject}
              {...this.props}
            />
          )
        }
      </>
    )
  }

  render() {
    const { users, loading } = this.props;
    return (
      <>
        <MainLayout
          leftHeader={this.renderLeftHeader()}
          leftChild={this.renderLeftChild()}
          rightHeader={this.renderRightHeader()}
          rightChild={this.renderRightChild()}
          loading={loading}
        />
        <Modal
          title="Criar Projeto"
          visible={this.state.visible}
          onOk={this.onCreateProject}
          okText="Criar"
          onCancel={this.onToggleModal}
        >
          <Input
            name="title"
            required
            allowClear
            placeholder="Titulo para projeto"
            onChange={e => this.onChangeName(e.target.value)}
          />
          <div style={{ margin: '24px 0' }} />
          <TextArea
            name="description"
            placeholder="Descrição do projeto"
            autosize={{ minRows: 3, maxRows: 6 }}
            onChange={e => this.onChangeDesc(e.target.value)}
          />
          <div style={{ margin: '24px 0' }} />

          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Selecione convidados"
            onChange={this.onChangeSelect}
          >
            {
              //ASSIM NÃO DÁ
              users.map(user => <Option key={user.id}>{user.email}</Option>)
            }
          </Select>
        </Modal>
      </>
    );
  }
}
export default Home;