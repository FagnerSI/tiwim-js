import React, { Component } from 'react';
import {
    Button,
    Spin,
    List,
    Tooltip,
    PageHeader,
    Popconfirm,
    Tag,
    Card,
    Empty,
} from 'antd';

import ProjectModal from '~/screens/Home/ProjectModal';
import TopicModal from '~/screens/Home/ProjectDetails/TopicModal';
import moment from 'moment';
import 'moment/locale/pt-br';

import './style.css';

const { Item } = List;

class ProjectDetails extends Component {

    /* renderEditButton() {
        const { project } = this.props;
        return (<ProjectModal project={project} isUpdateProject={true} />)
    } */

    renderDeleteButton(name, id, isTopic) {
        const itemName = name.length >= 15 ? `${name.substring(0, 15)}...` : name;

        return (
            <Popconfirm
                placement="bottomRight"
                title={`Deseja realmente excluir: ${itemName}?`}
                onConfirm={isTopic ? () => this.props.onDeleteTopic(id) : () => this.props.onDeleteProject(id)}
                okText="Sim"
                cancelText="Não"
            >
                <Tooltip placement="top" title={`Deletar ${isTopic ? 'Tópico' : 'Projeto'}`}>
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
                {`criado em ${moment(project.created_at).format('DD/MM/YYYY')}`}
            </div>
        )
    }

    renderDescription() {
        const { project } = this.props;
        return (
            <div className="project_desc">
                {project.description}
            </div>
        )
    }

    renderTags() {
        const roles = this.props.project.roles || [];
        return (
            <div className="projetc-roles">
                {roles.map((item) => <Tag color='blue'><div className="project-tag-roles">{item.name}</div></Tag>)}
            </div>
        )
    }

    renderMembers() {
        const members = this.props.project.members || [];
        return (
            <div className="projetc-roles">
                {members.map((item) => <Tag>{item.name} - {item.email}</Tag>)}
            </div>
        )
    }

    renderTopics() {
        const { topics, project } = this.props;
        return (
            topics && topics.length
                ? <List
                    bordered
                    className="demo-loadmore-list"
                    dataSource={topics}
                    renderItem={item => (
                        <Item key={item.id} actions={[
                            <TopicModal project={project} topic={item} />,
                            this.renderDeleteButton(item.title, item.id, true),
                        ]}>
                            <Item.Meta title={
                                <Button type='link' onClick={() => this.props.openTopic(item)}>
                                    {item.title}
                                </Button>
                            } />
                        </Item>
                    )}
                />
                : < Empty className="empty-topics" description="Esse projeto não possui tópicos." />
        )
    }

    render() {
        const { project, loading } = this.props;
        return (
            <Card className='card_project'>
                <PageHeader
                    key={project.id}
                    title={project.name}
                    className="project_info"
                    extra={[
                        // this.renderEditButton(),
                        this.renderDeleteButton(project.name, project.id)
                    ]}
                >
                    {this.renderDate()}
                    {this.renderDescription()}
                    {this.renderMembers()}
                    {this.renderTags()}
                </PageHeader>
                <div className="topic_list">
                    <span>Lista de Topicos</span>
                    <TopicModal project={project} />
                </div>
                <div className="list_container">
                    {loading
                        ? (
                            <div className="load-container" >
                                <Spin size="large" />
                            </div>
                        ) : this.renderTopics()
                    }
                </div>
            </Card>
        );
    }
}

export default ProjectDetails;