import React, { Component } from 'react';
import {
  PageHeader,
  Menu,
  Button,
  Tag,
  Icon,
  Empty,
  Row,
  Typography,
  Divider,
  List,
  Popconfirm,
  Skeleton
} from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br';
import './style.css';
import 'antd/dist/antd.css';

const { Paragraph } = Typography;

type Props = {
  onloadProject: () => void;
}

function randomColor() {
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ]
  return colors[Math.floor(Math.random() * 10)];
}

class Main extends Component<Props> {
  state = {
    current: '0',
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
      current: '0',
    });
  }

  render() {
    const { projects, project } = this.props;
    return (
      <div className="container">
        <div className="left-container">

          <span className="menu-title">
            <Button type="primary" style={{ fontSize: '15px' }}>
              <Icon type="plus" />
            </Button>
            <span style={{ padding: "0 10px" }}>Projetos</span>
          </span>

          <div className="menu-itens">
            <Menu
              onClick={this.onSelectProject}
              defaultSelectedKeys={['2']}
              selectedKeys={this.state.current}
              mode="inline"
            >

              {
                projects && projects.length
                  ? (
                    projects.map((project, index) => (
                      <Menu.Item key={index}>{project.name}</Menu.Item>
                    ))
                  )
                  : <Empty style={{ padding: '30px 0' }} description="Você não possui projetos." />
              }
            </Menu>
          </div>

          <div className="go-top">
            <Icon type="caret-up" />
          </div>

        </div>
        <div className="right-container">
          <PageHeader
            title={<span style={{ color: '#fff' }}>TiWIM</span>}
            // tags={<Tag color="blue">Running</Tag>}
            extra={[
              <Button key="1" type="primary">
                <Icon type="user" style={{ fontSize: '25px' }} />
              </Button>
            ]}
            className="header"
          />

          <div className="content">

            <div className="project-details">
              {
                project && project.roles && (
                  <PageHeader
                    title={project.name}
                    subTitle={
                      <div style={{ paddingTop: '4px', fontSize: '11px' }}>
                        {`criado em ${moment(project.created_at).format('DD/MM/YYYY')}`}
                      </div>
                    }
                    extra={[
                      <Button type="primary" ghost key="2"><Icon type="edit" /></Button>,
                      <Popconfirm
                        placement="bottomRight"
                        title={`Deseja excluir o projeto ${project.name}?`}
                        onConfirm={this.onDeleteProject}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <Button
                          type="danger" key="3">
                          <Icon type="delete" />
                        </Button>
                      </Popconfirm>
                      ,
                    ]}
                  >
                    <Paragraph >
                      {project.description}
                    </Paragraph>
                    <div className="roles">
                      {/*  <b>Papeis:</b> */}
                      {
                        project.roles.map((item) => <Tag color={randomColor()} > {item.name}</Tag>)
                      }
                    </div>
                    <Divider />

                  </PageHeader>
                )
              }
              <List
                className="demo-loadmore-list"
                // loading={initLoading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={project.topics}
                renderItem={item => (
                  <a href="https://ant.design">
                    <List.Item
                    //actions={[<a href="http://google.com">edit</a>, <a href="list-loadmore-more">more</a>]}
                    >
                      <List.Item.Meta
                        title={item.title}
                        description={`${item.description.substring(0, 130)}...`}
                      />
                      {/* <div>content</div> */}
                    </List.Item>
                  </a>
                )}
              />

            </div>


          </div>

        </div>

      </div >
    );
  }
}
export default Main;