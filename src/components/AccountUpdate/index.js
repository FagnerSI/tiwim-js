import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Modal,
} from 'antd';
import { isEmpty } from 'underscore';
import updateAccountRequest, {
    UPDATE_ACCOUNT_FAILURE,
    UPDATE_ACCOUNT_SUCCESS,
} from '~/store/updateAccount/action';
import EmailCheck from '~/common/EmailCheck';

class Account extends Component {

    componentDidMount() {
        const {
            account: { name, email },
            form: { setFieldsValue }
        } = this.props;

        setFieldsValue({
            name,
            email
        })
    }

    componentDidUpdate({ updateAccount }) {
        (() => {
            const { type } = this.props.updateAccount;
            if (type !== updateAccount.type) {
                if (type === UPDATE_ACCOUNT_SUCCESS) {
                    const { name, email } = this.props.updateAccount.payload;
                    this.props.form.setFieldsValue({
                        name,
                        email
                    })
                    this.props.onClose();
                }
                if (type === UPDATE_ACCOUNT_FAILURE) {
                    this.props.onClose();
                }
            }
        })();
    }

    onCloseModal = () => {
        const { name, email } = this.props.account;
        this.props.onClose();
        this.props.form.setFieldsValue({
            name,
            email
        })
    }

    onChange = field => e => {
        const { form: { setFieldsValue } } = this.props;

        setFieldsValue({
            [field]: e.target.value
        })
    }

    onSubmit = () => {
        const { form, dispatch, account } = this.props;

        form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                dispatch(updateAccountRequest({ id: account.id, ...values }))
            }
        });
    };

    render() {
        const {
            visibility,
            form: {
                getFieldDecorator
            }
        } = this.props;

        return (
            <Modal
                title="Perfil"
                maskClosable
                onOk={this.onSubmit}
                okText="Atualizar"
                onCancel={this.onCloseModal}
                visible={visibility}
            >
                <Form colon={false}>
                    <Form.Item label="Nome">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: 'Digite seu nome'
                            }],
                        }
                        )(
                            <Input
                                //disabled={isDisableFields}
                                size="large"
                                placeholder="Digite seu nome"
                                onChange={this.onChange('name')}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="Email">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Digite seu email'
                                },
                                {
                                    pattern: EmailCheck,
                                    message: 'Formato: exemplo@mail.com',
                                },

                            ],
                        }
                        )(
                            <Input
                                size="large"
                                //disabled={isDisableFields}
                                placeholder="exemplo@mail.com"
                                onChange={this.onChange('email')}
                            />,
                        )}
                    </Form.Item>
                    {/*                     
                    <Form.Item label="Senha">
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Digite sua senha'
                                },
                                {
                                    min: 8,
                                    message: 'Mínimo de 8 caracteres',
                                },
                            ],
                        })(
                            <Input.Password
                                size="large"
                                placeholder="Digite sua senha"
                                onChange={this.onChange('password')}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="Confirmar senha">
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Digite a senha novamente'
                                },
                                {
                                    min: 8,
                                    message: 'Mínimo de 8 caracteres',
                                },
                            ],
                        }
                        )(
                            <Input.Password
                                size="large"
                                placeholder="Digite a senha novamente"
                                onChange={this.onChange('confirmPassword')}
                            />,
                        )}
                    </Form.Item>
                    */}
                </Form>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        account: state.account.payload,
        updateAccount: state.updateAccount,
    }
}

const WrappedAccount = Form.create({})(Account);


export default connect(mapStateToProps)(WrappedAccount);