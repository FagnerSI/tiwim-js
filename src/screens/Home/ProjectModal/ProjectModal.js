import React, { Component } from 'react';
import {
    Spin,
    Button,
    Form,
    Input,
    Tooltip,
    Modal,
    Tag,
    Select,
    Divider,
} from 'antd';
import { isEmpty } from 'underscore';
import 'antd/dist/antd.css';
import Search from '~/common/SearchField';
import getAtrrInArray from '~/common/getAtrrInArray';

const { TextArea } = Input;
const { Option } = Select;

const initState = {
    name: '',
    description: '',
    members: [],
    roles: [],
    roleValue: '',
    showRoles: true,
    visible: false,
    inputRoleVisible: false,
}

class ProjectModal extends Component {

    state = {
        ...initState,
    }

    componentWillUpdate({ currentRoleId }) {
        if (currentRoleId !== this.props.currentRoleId) {
            if (currentRoleId) {
                this.setState(({ roles }) => ({
                    roles: [...roles, String(currentRoleId)],
                    roleValue: '',
                }))
            }
        }
    }

    onChangeValue = (field) => (e) => {
        const value = e && e.target ? e.target.value : e;
        this.setState({ [field]: value })
    }

    removeUserLoggedOfMembers = () => {
        const { project } = this.props;
        if (project) {
            let membersIds = getAtrrInArray("id", project.members);
            let indexRemove = membersIds.indexOf(this.props.account.id);
            membersIds.splice(indexRemove, 1);
            return membersIds;
        }
    }

    onOpenModal = () => {
        const { getData, isUpdateProject, project } = this.props

        getData();
        this.setState({ visible: true });

        if (isUpdateProject && project) {
            this.setState(
                {
                    name: project.name,
                    description: project.description,
                    members: this.removeUserLoggedOfMembers(),
                    roles: getAtrrInArray('id', project.roles),
                }
            )
        };
    };

    onCloseModal = () => {
        this.setState({ ...initState });
        this.props.form.resetFields()
    };

    toggleShowRoles = () => {
        this.setState(({ showRoles }) => ({ showRoles: !showRoles }),
            () => {
                this.props.form.setFieldsValue({
                    name: this.state.name,
                    description: this.state.description,
                    members: this.removeUserLoggedOfMembers(),
                })
            }
        )
    };

    onCreateRole = () => {
        this.props.onCreateRole(this.state.roleValue)
    }

    removeRole = (removedRole) => () => {
        // eslint-disable-next-line eqeqeq
        const roles = this.state.roles.filter(role => role != removedRole.id);
        this.setState({ roles });
    };

    showInputRole = () => {
        this.setState(
            ({ inputRoleVisible }) => ({ inputRoleVisible: !inputRoleVisible }),
            () => this.inputRole && this.inputRole.focus()
        );
    };

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                const { members, roles } = this.state;
                members.push(this.props.account.id);

                if (this.props.isUpdateProject) {
                    this.props.onUpdateProject({ ...values, members, roles })
                } else {
                    this.props.onCreateProject({ ...values, members, roles })
                }
                this.onCloseModal();
            }
        });

    }

    renderForm() {
        const { users, form, allRoles } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form colon={false}>
                <Form.Item label="Título">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: 'Digite o título da discussão'
                        }],
                    }
                    )(<Input
                        name="name"
                        allowClear
                        placeholder="Título da discussão"
                        onChange={this.onChangeValue('name')}
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
                            placeholder="Descrição da discussão"
                            autoSize={{ minRows: 2, maxRows: 4 }}
                            onChange={this.onChangeValue('description')}
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
                            onChange={this.onChangeValue('members')}
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
                <div className="tag-roles-container">
                    {allRoles.filter(
                        item => this.state.roles.includes(String(item.id))
                    ).map((role, index) => {
                        const isLongTag = role.length > 20;
                        const tagElem = (
                            <Tag
                                key={index}
                                closable={index !== 0}
                                color="blue"
                                onClose={this.removeRole(role)}
                            >
                                <div className="tag-roles">{isLongTag ? `${role.name.slice(0, 20)}...` : role.name}</div>
                            </Tag>
                        );
                        return isLongTag ? (
                            <Tooltip key={index} title={role.name}>
                                {tagElem}
                            </Tooltip>
                        ) : (
                                tagElem
                            );
                    })}
                </div>
            </Form >
        )
    }

    renderRoles() {
        const { roles, roleValue, inputRoleVisible } = this.state;
        return (
            <div className="tag-roles-container">
                {
                    this.props.loading
                        ? (
                            <div className="loading_container_role" >
                                <Spin size="large" />
                            </div>
                        )
                        : (
                            <>
                                <Form colon={false}>
                                    <Form.Item label="Selecione Papeis">
                                        <Select
                                            allowClear
                                            mode="multiple"
                                            value={roles}
                                            showArrow={true}
                                            style={{ width: '100%' }}
                                            placeholder="Selecione papeis para discussão"
                                            onChange={this.onChangeValue('roles')}
                                            showSearch
                                            optionFilterProp='children'
                                            filterOption={(input, option) =>
                                                Search(input, option.props.children)
                                            }
                                        >
                                            {
                                                this.props.allRoles.map(
                                                    role => <Option key={role.id}>{role.name}</Option>)
                                            }
                                        </Select>
                                    </Form.Item>
                                </Form>
                                <Divider>
                                    <Button
                                        onClick={this.showInputRole}
                                        type="link"
                                    >
                                        Ou crie um papel
                                    </Button>
                                </Divider>
                                {
                                    inputRoleVisible &&
                                    <Form colon={false}>
                                        <Form.Item label="Nome do Papel">
                                            <Input
                                                ref={ref => this.inputRole = ref}
                                                placeholder="Digite o nome do papel"
                                                type="text"
                                                value={roleValue}
                                                onChange={this.onChangeValue('roleValue')}
                                                onPressEnter={this.onCreateRole}
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                onClick={this.onCreateRole}
                                                disabled={!roleValue}
                                            >
                                                Criar Papel
                                    </Button>
                                        </Form.Item>
                                    </Form>
                                }
                            </>
                        )
                }
            </div>
        );
    }

    render() {
        const { isUpdateProject } = this.props
        const { showRoles } = this.state;

        const okTextSecondary = isUpdateProject ? 'Atualizar' : 'Criar';

        return (
            <>
                <Tooltip placement='bottomRight' title={isUpdateProject ? "Atualizar Discussão" : "Criar nova Discussão"}>
                    <Button
                        type={"primary"}
                        ghost={isUpdateProject}
                        icon={isUpdateProject ? "edit" : "plus"}
                        onClick={this.onOpenModal}
                    />
                </Tooltip>
                <Modal
                    title={isUpdateProject ? "Editar Discussão" : "Criar Discussão"}
                    visible={this.state.visible}
                    maskClosable={false}
                    onCancel={this.onCloseModal}
                    onOk={showRoles ? this.toggleShowRoles : this.onSubmit}
                    okText={showRoles ? 'Continuar' : okTextSecondary}
                    centered={true}
                >
                    {showRoles ? this.renderRoles() : this.renderForm()}
                </Modal>
            </>
        );
    }
}
const WrappedProject = Form.create({})(ProjectModal);

export default WrappedProject;