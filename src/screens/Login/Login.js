import React, { Component } from 'react';
import {
    Card,
    Form,
    Icon,
    Input,
    Button,
    Checkbox
} from 'antd';


import './style.css';
import 'antd/dist/antd.css';


class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-container">
                <Card bordered style={{ width: 380 }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'username',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your username!'
                                            }
                                        ],
                                    }
                                )(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'password',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your Password!'
                                            }
                                        ],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'remember',
                                    {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    }
                                )(
                                    <Checkbox>Remember me</Checkbox>)
                            }
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <div>
                                <a className="login-form-forgot" href="/">Forgot password </a>
                                Or <a href="/">register now!</a>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);

export default WrappedLogin;