import React, { Component } from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
} from 'antd';
import { isEmpty } from 'underscore';
import EmailCheck from '~/common/EmailCheck';
import 'antd/dist/antd.css';

class Login extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    onChange = value => {
        this.setState(value);
    };

    onSubmit = () => {
        const { form, onCreateAccount } = this.props;

        form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                onCreateAccount(values)
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
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
                            size="large"
                            placeholder="Digite seu nome"
                            onChange={e => this.onChange({ name: e.target.value })}
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
                            placeholder="exemplo@mail.com"
                            onChange={e => this.onChange({ email: e.target.value })}
                        />,
                    )}
                </Form.Item>
                <Row>
                    <Col span={11} >
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
                    </Col>
                    <Col span={11} offset={2}>
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
                                    onChange={e => this.onChange({ confirmPassword: e.target.value })}
                                />,
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" onClick={this.onSubmit}>
                        Criar conta
                        </Button>
                </Form.Item>
            </Form>
        )

    }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);

export default WrappedLogin;