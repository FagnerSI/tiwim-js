import React, { Component } from 'react';
import {
    Form,
    Input,
} from 'antd';
import Footer from '../FooterProject';
import { isEmpty } from 'underscore';
import 'antd/dist/antd.css';

const { TextArea } = Input;

class InfosBasic extends Component<> {

    componentDidMount() {
        const { name, description } = this.props;
        if (name) {
            this.props.form.setFieldsValue({ name, description })
        }
    }

    onChangeValue = (field) => (e) => {
        const value = e && e.target ? e.target.value : e;
        this.props.form.setFieldsValue({ [field]: value })
    }

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                this.props.onSuccess(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

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
                <Footer hidePrevious onOk={this.onSubmit} />
            </Form >
        )
    }
}

const WrappedBasic = Form.create({})(InfosBasic);

export default WrappedBasic;