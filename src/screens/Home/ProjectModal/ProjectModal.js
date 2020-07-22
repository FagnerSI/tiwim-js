import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
    Tooltip,
    Modal,
    Tag,
    Icon,
    Select,
} from 'antd';
import 'antd/dist/antd.css';

import { isEmpty } from 'underscore';
import Search from '~/common/SearchField';

const { TextArea } = Input;
const { Option } = Select;

const initState = {
    name: '',
    description: '',
    members: [],
    roles: ['Designer'],
    roleValue: '',
    visible: false,
    inputRoleVisible: false,
}

class ProjectModal extends Component {

    state = {
        ...initState,
    }

    onChangeValue = (value) => {
        this.setState(value)
    }

    onOpenModal = () => {
        this.props.getUsers();
        this.setState({ visible: true });
    }

    onCloseModal = () => {
        this.setState({ ...initState });
        this.props.form.resetFields()
    };

    removeRole = removedRole => {
        const roles = this.state.roles.filter(role => role !== removedRole);
        this.setState({ roles });
    };

    showInputRole = () => {
        this.setState({ inputRoleVisible: true }, () => this.inputRole.focus());
    };

    onRoleConfirm = () => {
        const { roleValue } = this.state;
        let { roles } = this.state;

        /*  Nada de papel com espaço .replace(/\s/g, "") !== "" */

        if (roleValue && roles.indexOf(roleValue) === -1) {
            roles = [...roles, roleValue];
        }

        this.setState({
            roles,
            inputRoleVisible: false,
            roleValue: '',
        });
    };

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                const { roles } = this.state;
                const { name, description, members } = values;
                this.props.onCreateProject({ name, description, members, roles })
                this.onCloseModal();
            }
        });

    }

    renderForm() {
        const { users, form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form colon={false}>
                <Form.Item label="Nome">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: 'Digite o nome do projeto'
                        }],
                    }
                    )(<Input
                        name="name"
                        required
                        allowClear
                        placeholder="Nome do projeto"
                        onChange={e => this.onChangeValue({ name: e.target.value })}
                    />,
                    )}
                </Form.Item>
                <Form.Item label="Descrição">
                    {getFieldDecorator('description', {
                        rules: [{ message: 'Digite uma descrição' }],
                    }
                    )(
                        <TextArea
                            name="description"
                            placeholder="Descrição do projeto"
                            autosize={{ minRows: 2, maxRows: 4 }}
                            onChange={e => this.onChangeValue({ description: e.target.value })}
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
                            onChange={members => this.onChangeValue({ members })}
                            showSearch
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                Search(input, option.props.children)
                            }
                        >
                            {users.map(user => <Option key={user.id}>{user.email}</Option>)}
                        </Select>
                    )}
                </Form.Item>
            </Form >
        )
    }

    renderRoles() {
        const { roles, inputRoleVisible, roleValue } = this.state;

        return (
            <div className="tag-roles-container">
                {roles.map((role, index) => {
                    const isLongTag = role.length > 30;
                    const tagElem = (
                        <Tag key={index} closable={index !== 0} color="blue" onClose={() => this.removeRole(role)}>
                            <div className="tag-roles">{isLongTag ? `${role.slice(0, 20)}...` : role}</div>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={role} key={index}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                            tagElem
                        );
                })}
                {inputRoleVisible && (
                    <Input
                        ref={input => this.inputRole = input}
                        type="text"
                        value={roleValue}
                        className="input-tag-roles"
                        onChange={e => this.onChangeValue({ roleValue: e.target.value })}
                        onBlur={this.onRoleConfirm}
                        onPressEnter={this.onRoleConfirm}
                    />
                )}
                {!inputRoleVisible && (
                    <Tag onClick={this.showInputRole} style={{ background: '#fff', borderStyle: 'dashed' }}>
                        <div className="tag-roles"><Icon type="plus" /> Novo Papel </div>
                    </Tag>
                )}
            </div>
        );
    }

    render() {

        return (
            <>
                <Tooltip placement='bottomRight' title="Novo Projeto">
                    <Button
                        type="primary"
                        icon="plus"
                        className="btn-circle-icon"
                        onClick={this.onOpenModal}
                    />
                </Tooltip>
                <Modal
                    title="Criar Projeto"
                    visible={this.state.visible}
                    maskClosable={false}
                    onCancel={this.onCloseModal}
                    onOk={this.onSubmit}
                    okText={'Criar'}
                    centered={true}
                >
                    {this.renderForm()}
                    {this.renderRoles()}
                </Modal>
            </>
        );
    }
}
const WrappedProject = Form.create({})(ProjectModal);

export default WrappedProject;