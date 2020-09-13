import React, { Component } from 'react';
import {
    Button,
    Spin,
    Input,
    Form,
    List,
    Modal,
    Tooltip,
    PageHeader,
    Popconfirm,
    Select,
    Tag,
    Card,
    Empty,
} from 'antd';

import ProjectModal from '~/screens/Home/ProjectModal';
import { isEmpty } from 'underscore';
import Search from '~/common/SearchField';

import moment from 'moment';
import 'moment/locale/pt-br';

import './style.css';

const { Item } = List;
const { TextArea } = Input;
const { Option } = Select;

class ProjectDetails extends Component {

    state = {
        visible: false,
    };

    onToggleModal = () => {
        const { visible } = this.state;
        this.setState({
            visible: !visible,
        });
    };

    onChange(value) {
        this.setState(value)
    }

    onCreateTopic = () => {
        this.props.form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                const { title, description, members } = this.state;
                members.push(this.props.account.id);
                this.props.onCreateTopic({ title, description, members })
                this.onToggleModal();
            }
        });
    }

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

    renderForm() {
        const { account, project, form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form colon={false}>
                <Form.Item label="Título">
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true,
                            message: 'Digite o titulo do tópico'
                        }],
                    }
                    )(<Input
                        name="title"
                        required
                        allowClear
                        placeholder="Título para tópico"
                        onChange={e => this.onChange({ title: e.target.value })}
                    />,
                    )}
                </Form.Item>
                <Form.Item label="Descrição">
                    {getFieldDecorator('description', {
                        rules: [{
                            message: 'Digite uma descrição para o tópico'
                        }],
                    }
                    )(<TextArea
                        name="description"
                        placeholder="Descrição do topico"
                        autosize={{ minRows: 3, maxRows: 6 }}
                        onChange={e => this.onChange({ description: e.target.value })}
                    />,
                    )}
                </Form.Item>
                <Form.Item label="Convidados">
                    {getFieldDecorator('members', {
                        rules: [{
                            required: true,
                            message: 'Selecione convidados'
                        }],
                    }
                    )(

                        <Select
                            allowClear
                            mode="multiple"
                            showArrow={true}
                            style={{ width: '100%' }}
                            placeholder="Selecione convidados"
                            onChange={members => this.onChange({ members })}
                            showSearch
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                Search(input, option.props.children)
                            }
                        >
                            {project.members.filter(user => user.email !== account.email).map(user => <Option key={user.id}>{user.email}</Option>)}
                        </Select>
                    )}
                </Form.Item>
            </Form>
        )

    }

    renderTopics() {
        const { topics } = this.props;
        return (
            topics && topics.length
                ? <List
                    bordered
                    className="demo-loadmore-list"
                    dataSource={topics}
                    renderItem={item => (
                        <Item key={item.id} actions={[this.renderDeleteButton(item.title, item.id, true)]}>
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
                    <Tooltip placement='topLeft' title="Novo Tópico">
                        <Button
                            type="primary"
                            className="btn-circle-icon"
                            icon="plus"
                            onClick={this.onToggleModal}
                        />
                    </Tooltip>
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
                <Modal
                    title="Criar Topico"
                    visible={this.state.visible}
                    onOk={this.onCreateTopic}
                    okText="Criar"
                    onCancel={this.onToggleModal}
                    centered
                    maskClosable={false}
                >
                    {this.renderForm()}
                </Modal>
            </Card>
        );
    }
}


const WrappedProjectDetails = Form.create({})(ProjectDetails);

export default WrappedProjectDetails;