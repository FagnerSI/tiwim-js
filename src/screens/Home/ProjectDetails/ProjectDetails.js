import React, { Component } from 'react';
import {
    Divider,
    Button,
    Spin,
    List,
    Tooltip,
    PageHeader,
    Popconfirm,
    Tag,
    Card,
    Empty,
    Tabs,
} from 'antd';

import ProjectModal from '~/screens/Home/ProjectModal';
import TopicModal from '~/screens/Home/ProjectDetails/TopicModal';
import moment from 'moment';
import 'moment/locale/pt-br';

import './style.css';

const { TabPane } = Tabs;

function getSubstring(str, size) {
    return str && str.length >= size ? `${str.substring(0, size)}...` : str
}
class ProjectDetails extends Component {

    state = {
        activeTab: "0"
    }

    componentDidUpdate({ project }) {
        if (this.props.project) {
            if (this.props.project.id !== project.id) {
                this.setState({ activeTab: "0" })
            }
        }
    }

    setTabActive = (key) => {
        this.setState({ activeTab: key })
    }

    renderEditButton() {
        const { project } = this.props;
        return (<ProjectModal project={project} isUpdateProject={true} />)
    }

    renderDeleteButton(name, id, isTopic) {
        const itemName = getSubstring(name, 15);

        return (
            <Popconfirm
                placement="bottomRight"
                title={`Deseja realmente excluir: ${itemName}?`}
                onConfirm={isTopic ? () => this.props.onDeleteTopic(id) : () => this.props.onDeleteProject(id)}
                okText="Sim"
                cancelText="Não"
            >
                <Tooltip placement="top" title={`Deletar ${isTopic ? 'Tópico' : 'Discussão'}`}>
                    <Button
                        type="danger"
                        icon="delete"
                        ghost
                    />
                </Tooltip>
            </Popconfirm>
        )
    }

    renderDate() {
        const { project } = this.props;
        return (
            <div className="date">
                {`Criado em ${moment(project.created_at).format('DD/MM/YYYY')}`}
            </div>
        )
    }

    renderDescription() {
        const { project } = this.props;

        if (!project || !project.description) return null;

        return (
            <div className="project_desc">
                {project.description}
            </div>
        )
    }

    renderTags() {
        const roles = this.props.project.roles || [];
        return (
            <div className="list_container">
                <div className="projetc-roles">
                    {roles.map((item, i) => <Tag color='blue' key={i}><div className="project-tag-roles">{item.name}</div></Tag>)}
                </div>
            </div>
        )
    }

    renderMembers() {
        const members = this.props.project.members || [];

        return (
            <div className="list_container">
                <List
                    className="demo-loadmore-list"
                    dataSource={members}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.name}
                                description={item.email}
                            />
                        </List.Item>
                    )}

                />
            </div>

        )
    }

    renderTopics() {
        const { topics, project } = this.props;
        return (
            topics && topics.length
                ? <List
                    dataSource={topics}
                    renderItem={(item, index) => (
                        <div key={item.id} className="topic_item_container">
                            <div className="topic_text" onClick={this.props.openTopic(item)}>
                                {item.title.toUpperCase()}
                            </div>
                            <div>
                                <Divider type="vertical" />
                                <TopicModal project={project} topic={item} key={index} />
                                <Divider type="vertical" />
                                {this.renderDeleteButton(item.title, item.id, true)}
                            </div>
                        </div>
                    )}
                />
                : <Empty className="empty-topics" description="Essa discussão não possui tópicos." />

        )
    }

    renderListTopics() {
        const { loading, project } = this.props;
        return (
            <>
                <div className="topic_list">
                    <TopicModal project={project} />
                </div>
                {
                    loading
                        ? (
                            <div className="load-container" >
                                <Spin size="large" />
                            </div>
                        ) : <div className="list_container">{this.renderTopics()}</div>
                }
            </>
        )
    }

    renderTabs() {
        const tabs = [
            {
                title: "Tópicos",
                component: this.renderListTopics(),
            },
            {
                title: "Membros",
                component: this.renderMembers(),
            },
            {
                title: "Papéis",
                component: this.renderTags(),
            },
        ]

        return (
            <Tabs
                defaultActiveKey="0"
                activeKey={this.state.activeTab}
                onTabClick={this.setTabActive}
            >
                {
                    tabs.map(
                        (item, i) =>
                            <TabPane
                                tab={item.title}
                                key={`${i}`}
                            >
                                {item.component}
                            </TabPane>)
                }

            </Tabs>
        )
    }

    render() {
        const { project } = this.props;
        return (
            <Card className='card-project'>
                <PageHeader
                    key={project.id}
                    title={project.name}
                    className="project_info"
                    extra={[
                        this.renderEditButton(),
                        this.renderDeleteButton(project.name, project.id)
                    ]}
                >
                    {this.renderDate()}
                    {this.renderDescription()}
                </PageHeader>
                {this.renderTabs()}
            </Card >
        );
    }
}

export default ProjectDetails;