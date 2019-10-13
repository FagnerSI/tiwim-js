import React, { Component } from 'react';
import {
    Button,
    Icon,
    List,
    PageHeader,
    Popconfirm,
    Tag,
} from 'antd';
import randomColor from '~/common/randomTagColor';
import moment from 'moment';
import 'moment/locale/pt-br';

import './style.css';

const { Item } = List;

export default class ProjectDetails extends Component {

    renderEditButton(action) {
        return (
            <Button type="primary" ghost key="1"><Icon type="edit" /></Button>
        )
    }

    renderDeleteButton(name, action) {
        return (
            <Popconfirm
                placement="bottomRight"
                title={`Deseja realmente excluir ${name}?`}
                onConfirm={action}
                okText="Sim"
                cancelText="Não"
            >
                <Button type="danger" ghost key="2">
                    <Icon type="delete" />
                </Button>
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

    renderTags() {
        const roles = this.props.project.roles || [];
        return (
            <div className="roles">
                {roles.map((item) => <Tag color={randomColor()}>{item.name}</Tag>)}
            </div>
        )
    }

    render() {
        const { project, onDeleteProject } = this.props;

        return (
            <div>
                <PageHeader
                    key={project.id}
                    title={project.name}
                    subTitle={this.renderDate()}
                    extra={[
                        this.renderEditButton(),
                        this.renderDeleteButton(project.name, onDeleteProject)
                    ]}
                    className="project_info"
                >
                    {project.description}
                    {this.renderTags()}
                </PageHeader>
                <div className="topic_list">
                    <span>Topicos</span>
                </div>
                <div className="list_container">
                    <List
                        bordered
                        className="demo-loadmore-list"
                        dataSource={project.topics}
                        renderItem={item => (
                            <Item key={item.id} actions={[this.renderDeleteButton(item.title)]}>
                                <Item.Meta title={<a href="https://ant.design">{item.title}</a>} />
                            </Item>
                        )}
                    />
                </div>
            </div>
        );
    }
}
