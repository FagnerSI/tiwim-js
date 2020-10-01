import React, { Component } from 'react';
import {
    Button,
    Input,
    Form,
    Modal,
    Select,
    Tooltip,
} from 'antd';

import { isEmpty } from 'underscore';
import Search from '~/common/SearchField';
import getAtrrInArray from '~/common/getAtrrInArray';

const { TextArea } = Input;
const { Option } = Select;

class TopicModal extends Component {
    state = {
        title: '',
        description: '',
        members: [],
        visible: false,
    };

    removeUserLoggedOfMembers = () => {
        let members = getAtrrInArray("id", this.state.members);
        let indexRemove = members.indexOf(this.props.account.id);
        members.splice(indexRemove, 1);
        return members;
    }

    onOpenModal = () => {
        const { topic } = this.props;

        if (topic) {
            const {
                title,
                description,
                members,
            } = topic;

            this.setState({
                title,
                description,
                members,
            },
                () => this.props.form.setFieldsValue({
                    title: this.state.title,
                    description: this.state.description,
                    members: this.removeUserLoggedOfMembers(),
                })
            )
        }

        this.setState({
            visible: true,
        });
    };

    onCloseModal = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = (key) => (e) => {
        const value = e.target ? e.target.value : e;
        this.setState({ [key]: value })
    }

    onCreateTopic = () => {
        this.props.form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                const { members } = this.state;
                members.push(this.props.account.id);

                if (this.props.topic) {
                    this.props.onUpdateTopic({
                        ...values, members,
                    })
                } else {
                    this.props.onCreateTopic({ ...values, members })
                }
                this.onCloseModal();
            }
        });
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
                        onChange={this.onChange('title')}
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
                        onChange={this.onChange('description')}
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
                            onChange={this.onChange('members')}
                            showSearch
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                Search(input, option.props.children)
                            }
                        >
                            {
                                project.members.filter(
                                    user => user.email !== account.email).map(
                                        user => <Option key={user.id}>{user.email}</Option>
                                    )
                            }
                        </Select>
                    )}
                </Form.Item>
            </Form>
        )

    }

    render() {
        const { topic } = this.props;
        return [
            <Tooltip placement='topLeft' title={!topic && "Novo Tópico"}>
                <Button
                    type="primary"
                    ghost={topic}
                    icon={topic ? "edit" : "plus"}
                    className={!topic && "btn-circle-icon"}
                    onClick={this.onOpenModal}
                />
            </Tooltip>,
            <Modal
                title={topic ? "Atualizar Tópico" : "Criar Tópico"}
                visible={this.state.visible}
                onOk={this.onCreateTopic}
                okText={topic ? "Atualizar" : "Criar"}
                onCancel={this.onCloseModal}
                centered
                maskClosable={false}
            >
                {this.renderForm()}
            </Modal>
        ]
    }

}


const WrappedTopic = Form.create({})(TopicModal);

export default WrappedTopic;