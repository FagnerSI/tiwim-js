import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Icon,
    Input,
    List,
    Modal,
    PageHeader,
    Popconfirm,
    Select,
    Tag,
    Tooltip,
} from 'antd';
import randomColor from '~/common/randomTagColor';
import moment from 'moment';
import 'moment/locale/pt-br';

import './style.css';

const { Item } = List;
const { TextArea } = Input;
const { Option } = Select;

export default class ProjectDetails extends Component {

    state = {
        visible: false,
    };

    onToggleModal = () => {
        const { visible } = this.state;
        !visible && this.props.loadUsers();
        this.setState({
            visible: !visible,
        });
    };

    onChangeTitle(title) {
        this.setState({
            title
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

    onCreateTopic = () => {
        const { title, description, users } = this.state;
        this.props.onCreateTopic({ title, description, users })
        this.onToggleModal();
    }

    renderEditButton(action) {
        return (
            <Tooltip placement="top" title="Editar">
                <Button type="primary" ghost key="1"><Icon type="edit" /></Button>
            </Tooltip>
        )
    }

    renderDeleteButton(name) {
        return (
            <Tooltip placement="top" title="Excluir">
                <Popconfirm
                    placement="bottomRight"
                    title={`Deseja realmente excluir?`}
                    onConfirm={this.props.onDeleteProject}
                    okText="Sim"
                    cancelText="Não"
                >
                    <Button type="danger" ghost key="2">
                        <Icon type="delete" />
                    </Button>
                </Popconfirm>
            </Tooltip >
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
        const { project, users } = this.props;

        return (
            <div>
                <PageHeader
                    key={project.id}
                    title={project.name}
                    subTitle={this.renderDate()}
                    extra={[
                        this.renderEditButton(),
                        this.renderDeleteButton(project.name)
                    ]}
                    className="project_info"
                >
                    {project.description}
                    {this.renderTags()}
                </PageHeader>
                <div className="topic_list">
                    <span>Lista de Topicos</span>
                    <Tooltip placement="topLeft" title="Novo Topico">
                        <Button
                            type="primary"
                            className="btn-primary"
                            onClick={this.onToggleModal}
                        >
                            <Icon type="plus" />
                        </Button>
                    </Tooltip>
                </div>
                <div className="list_container">
                    <List
                        bordered
                        className="demo-loadmore-list"
                        dataSource={project.topics}
                        renderItem={item => (
                            <Item key={item.id} actions={[this.renderDeleteButton(item.title)]}>
                                <Item.Meta title={<Link to={`topics/${item.id}`}>{item.title}</Link>} />
                            </Item>
                        )}
                    />
                </div>
                <Modal
                    title="Criar Topico"
                    visible={this.state.visible}
                    onOk={this.onCreateTopic}
                    okText="Criar"
                    onCancel={this.onToggleModal}
                >
                    <Input
                        name="title"
                        required
                        allowClear
                        placeholder="Titulo para topico"
                        onChange={e => this.onChangeTitle(e.target.value)}
                    />
                    <div style={{ margin: '24px 0' }} />
                    <TextArea
                        name="description"
                        placeholder="Descrição do topico"
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
