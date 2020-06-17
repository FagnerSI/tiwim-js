import React, { Component } from 'react';
import {
  Empty,
  Menu,
} from 'antd';

import ProjectDetails from './ProjectDetails';
import ProjectModal from './ProjectModal';
import MainLayout from '~/components/MainLayout';
import { Header } from '~/components';
import './style.css';
import 'antd/dist/antd.css';

type Props = {
  onloadProject: () => void,
  onCreateProject: () => void,
}

class Home extends Component<Props> {

  state = {
    current: '0',
    project: null,
  };

  onSelectProject = e => {
    this.setState({
      current: e.key,
      project: this.props.projects[e.key],
    });

  };

  renderLeftHeader() {
    return (
      <div className='project-header'>
        <ProjectModal />
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
    const { project } = this.state;
    const projectSelected = project || this.props.projectDefault;

    if (!projectSelected) return null;

    return (
      <ProjectDetails
        project={projectSelected}
      />
    )
  }

  render() {
    const { loading } = this.props;

    return (
      <MainLayout
        leftHeader={this.renderLeftHeader()}
        leftChild={this.renderLeftChild()}
        rightHeader={this.renderRightHeader()}
        rightChild={this.renderRightChild()}
        loading={loading}
      />
    );
  }
}
export default Home;