import React, { Component } from 'react';
import {
  Button,
  Empty,
  Icon,
  Input,
  Menu,
  Modal,
  Select,
  Tooltip,
} from 'antd';

import ProjectDetails from '~/scenes/ProjectDetails';
import MainLayout from '~/components/MainLayout';
import Header from '~/components/Header';
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

  onChangeSelect = (users) => {
    this.setState({
      users
    })
  }

  onCreateProject = () => {
    const { name, description, users } = this.state;
    this.props.onCreateProject({ name, description, users })
    this.onToggleModal();
  }

  renderLeftHeader() {
    return (
      <div className='project-header'>
        <Tooltip placement="bottomLeft" title="Novo Projeto">
          <Button
            type="primary"
            className="btn-primary"
            onClick={this.onToggleModal}
          >
            <Icon type="plus" />
          </Button>
        </Tooltip>
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
              onDeleteProject={this.onDeleteProject}
              {...this.props}
            />
          )
        }
      </>
    )
  }

  render() {
    const { users } = this.props;
    return (
      <>
        <MainLayout
          leftHeader={this.renderLeftHeader()}
          leftChild={this.renderLeftChild()}
          rightHeader={this.renderRightHeader()}
          rightChild={this.renderRightChild()}
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