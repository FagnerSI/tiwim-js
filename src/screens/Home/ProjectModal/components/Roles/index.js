import React, { Component } from 'react';
import {
    Spin,
    Form,
    Input,
    Button,
    Select,
    Divider,
} from 'antd';
import Footer from '../FooterProject';
import Search from '~/common/SearchField';
import 'antd/dist/antd.css';

const { Option } = Select;

class Roles extends Component<>{
    state = {
        roles: [],
        roleValue: ''
    }

    componentDidMount() {
        const { roles } = this.props;
        if (roles && roles.length) {
            this.setState({ roles })
        }
    }

    componentDidUpdate({ currentRoleId }) {
        if (currentRoleId !== this.props.currentRoleId) {
            if (this.props.currentRoleId) {
                this.setState(({ roles }) => ({
                    roles: [...roles, String(this.props.currentRoleId)],
                    roleValue: '',
                }))
            }
            this.showInputRole();
        }
    }

    onChangeValue = (field) => (e) => {
        const value = e && e.target ? e.target.value : e;
        this.setState({ [field]: value })
    }

    showInputRole = () => {
        this.setState(
            ({ inputRoleVisible }) => ({ inputRoleVisible: !inputRoleVisible }),
            () => this.inputRole && this.inputRole.focus()
        );
    };

    onCreateRole = () => {
        this.props.onCreateRole(this.state.roleValue)
    }

    onSubmit = () => {
        this.props.onSuccess({ roles: this.state.roles });
    }

    renderFormRole = () => {
        const { roleValue } = this.state;
        return (
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
        )
    }

    render() {
        const { roles, inputRoleVisible } = this.state;

        return (
            <div>
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
                                        {
                                            inputRoleVisible
                                                ? 'Deixar criação de papel'
                                                : 'Criar papel'
                                        }
                                    </Button>
                                </Divider>
                                {
                                    inputRoleVisible && this.renderFormRole()

                                }
                            </>
                        )
                }
                <Footer
                    onPrevious={this.props.onPrevious}
                    onOk={this.onSubmit}
                    okDisabled={!this.state.roles.length}
                />
            </div>
        );
    }
}


const WrappedRoles = Form.create({})(Roles);

export default WrappedRoles;