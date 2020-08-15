import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Button,
} from 'antd';
import { logo_h } from '~/assets'

import { isEmpty } from 'underscore';
import EmailCheck from '~/common/EmailCheck';

import './style.css';
import 'antd/dist/antd.css';

class Login extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isCreateAccount: false,
    }

    onOpenLogin = value => {
        this.setState({ isCreateAccount: false });
        this.props.form.resetFields()
    };

    onOpenCreateAccount = value => {
        this.setState({ isCreateAccount: true });
        this.props.form.resetFields()
    };

    onChange = value => {
        this.setState(value);
    };

    onSubmit = () => {
        const { isCreateAccount } = this.state;
        const { form, onCreateAccount, onLogin } = this.props;

        form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                isCreateAccount
                    ? onCreateAccount(values)
                    : onLogin(values)
            }
        });
    };

    render() {
        const { isCreateAccount } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-container">
                <Card className="login-card">
                    <div className="login-logo-container" >
                        <img src={logo_h} className="login-logo" alt="Logo da plataforma" />
                    </div>
                    <Form colon={false}>
                        {isCreateAccount &&
                            (<Form.Item label="Nome">
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: 'Digite seu nome'
                                    }],
                                }
                                )(
                                    <Input
                                        size="large"
                                        placeholder="Digite seu nome"
                                        onChange={e => this.onChange({ name: e.target.value })}
                                    />,
                                )}
                            </Form.Item>)
                        }
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
                                    placeholder="exemplo@mail.com"
                                    onChange={e => this.onChange({ email: e.target.value })}
                                />,
                            )}
                        </Form.Item>
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
                                    onChange={e => this.onChange({ password: e.target.value })}
                                />,
                            )}
                        </Form.Item>
                        {isCreateAccount &&
                            (<Form.Item label="Confirmar senha">
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
                                        onChange={e => this.onChange({ confirmPassword: e.target.value })}
                                    />,
                                )}
                            </Form.Item>)
                        }
                        <Form.Item>
                            {
                                !isCreateAccount &&
                                <div className="forgot-container">
                                    <a href="/">Esqueceu sua senha?</a>
                                </div>
                            }
                            <Button type="primary" onClick={this.onSubmit} block>
                                {isCreateAccount ? 'Criar conta' : 'Entrar'}
                            </Button>
                            <div className="login-select-container">
                                {isCreateAccount ? 'Você já possui uma conta?' : 'Ainda não possui conta?'}
                                <Button
                                    type='link'
                                    onClick={isCreateAccount ? this.onOpenLogin : this.onOpenCreateAccount}
                                    className="login-select-button"
                                //block
                                >
                                    {isCreateAccount ? 'Fazer login' : ' Criar conta'}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Card >
            </div >
        );
    }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);

export default WrappedLogin;