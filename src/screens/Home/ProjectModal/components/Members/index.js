import React, { Component } from 'react';
import {
    Spin,
    Form,
    Button,
    Select,
    Divider,
} from 'antd';
import AccountCreate from '~/components/AccountCreate';
import Footer from '../FooterProject';
import Search from '~/common/SearchField';
import 'antd/dist/antd.css';

const { Option } = Select;

class Members extends Component<>{
    state = {
        members: [],
    }

    componentDidMount() {
        const { members } = this.props;
        if (members && members.length) {
            this.setState({ members })
        }
    }

    componentDidUpdate({ currentMemberId }) {
        if (currentMemberId !== this.props.currentMemberId) {
            if (this.props.currentMemberId) {
                this.setState(({ members }) => ({
                    members: [...members, String(this.props.currentMemberId)],
                }))
            }
            this.setShowFormAccount();
        }
    }

    onChangeValue = (field) => (e) => {
        const value = e && e.target ? e.target.value : e;
        this.setState({ [field]: value })
    }

    setShowFormAccount = () => {
        this.setState(
            ({ showFormAccount }) => ({ showFormAccount: !showFormAccount })
        );
    };

    onSubmit = () => {
        this.props.onSuccess({ members: this.state.members });
    }

    renderForm = () => {
        return (
            <AccountCreate onCreateAccount={this.props.onCreateAccount} />
        )
    }

    render() {
        const { members } = this.state;
        const { users } = this.props;

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
                                    <Form.Item label="Convidados">
                                        <Select
                                            allowClear
                                            mode="multiple"
                                            value={members}
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
                                    </Form.Item>
                                </Form>
                                <Divider>
                                    <Button
                                        onClick={this.setShowFormAccount}
                                        type="link"
                                    >
                                        {
                                            this.state.showFormAccount
                                                ? 'Deixar criação de conta'
                                                : 'Criar conta para um convidado'
                                        }
                                    </Button>
                                </Divider>
                                {
                                    this.state.showFormAccount && this.renderForm()

                                }
                            </>
                        )
                }
                <Footer
                    okText={this.props.isUpdateProject ? 'Atualizar' : 'Criar Discussão'}
                    okDisabled={!this.state.members.length}
                    onPrevious={this.props.onPrevious}
                    onOk={this.onSubmit}
                />
            </div>
        );
    }
}


export default Members;