import React, { Component } from 'react';
import {
  Button,
  Empty,
  Icon,
  Input,
  Menu,
  Modal,
  PageHeader,
  Select,
  Tooltip,
} from 'antd';

import ProjectDetails from '~/components/ProjectDetails';
import './style.css';
import 'antd/dist/antd.css';


const { TextArea } = Input;
const { Option } = Select;

type Props = {
  onloadProject: () => void,
  onCreateProject: () => void,
}

class Main extends Component<Props> {
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
    this.props.onDeleteProject()
    this.setState({
      current: 0,
    });
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


  render() {
    const { projects, users, project } = this.props;
    return (
      <div className="container">
        <div className="left-container">

          <div className="menu-title">
            <Tooltip placement="bottomLeft" title="Criar Projeto">
              <Button
                type="primary"
                className="project-plus"
                onClick={this.onToggleModal}
              >
                <Icon type="plus" />
              </Button>
            </Tooltip>
            <span style={{ padding: "0 10px" }}>Projetos</span>
          </div>

          <div className="menu-itens">
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
          </div>

          {/*  <div className="go-top">
            <Icon type="caret-up" />
          </div> */}

        </div>

        <div className="right-container">
          <PageHeader
            title={<span style={{ color: '#fff' }}>TiWIM</span>}
            extra={[
              <Button
                key="1"
                className="user-btn"
                type="primary"
              >
                <Icon type="user" style={{ fontSize: '25px' }} />
              </Button>
            ]}
            className="header"
          />
          <div className="content">
            {
              project && (
                <ProjectDetails
                  project={project}
                  onDeleteProject={this.onDeleteProject}
                />
              )
            }
          </div>

        </div>

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
      </div>
    );
  }
}
export default Main;