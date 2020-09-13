import React, { Component } from 'react';
import {
  Empty,
  Menu,
} from 'antd';
import { isEmpty } from 'underscore';
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

  componentDidUpdate({ projects }) {
    if (isEmpty(this.props.projects) === false) {
      if (this.props.projects.length !== projects.length) {
        this.setState({
          current: '0',
          project: this.props.projects[0]
        }, () => this.props.getTopics(this.state.project.id))
      }
    }

  }

  onSelectProject = e => {
    this.setState({
      current: e.key,
      project: this.props.projects[e.key],
    }, () => this.props.getTopics(this.state.project.id));
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
            : <Empty className='empty-project' description="Você não possui projetos." />
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
    const projectSelected = project;
    if (isEmpty(projectSelected)) return null;

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