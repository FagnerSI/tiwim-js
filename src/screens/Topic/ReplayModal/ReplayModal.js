import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
    Tooltip,
    Modal,
    Row,
    Col,
    Icon,
    Select,
} from 'antd';
import 'antd/dist/antd.css';

import { isEmpty } from 'underscore';
import Search from '~/common/SearchField';

const { TextArea } = Input;
const { Option } = Select;

const KIND_OF_SPEECH_CHOICES = [
    { key: 'PE', text: 'Pergunto' },
    { key: 'SU', text: 'Sugiro' },
    { key: 'AD', text: 'Além disso' },
    { key: 'CM', text: 'Comento' },
    { key: 'ACT', text: 'Acrescento' },
    { key: 'INF', text: 'Informo' },
    { key: 'RP', text: 'Respondo' },
    { key: 'CD', text: 'Concordo' },
    { key: 'DIS', text: 'Discordo' },
    { key: 'PRQ', text: 'Para que' },
    { key: 'PQ', text: 'Porque' },
    { key: 'PC', text: 'Peço' },
    { key: 'EX', text: 'Explico' },
    { key: 'EXF', text: 'Exemplifico' },
    { key: 'NE', text: 'Não entendi' },
    { key: 'E', text: 'E' },
    { key: 'ET', text: 'Então' },
    { key: 'OU', text: 'Ou' },
    { key: 'MAS', text: 'Mas' },
    { key: 'CNM', text: 'Concordo mas' },
    { key: 'DSM', text: 'Discordo mas' },
    { key: 'CON', text: 'Continuo' },
]

const initState = {
    url_details: '',
    description: '',
    kind_speech: '',
    roles_for: [],
    roles_in: '',
    visible: false,
}

class ReplayModal extends Component {

    state = {
        ...initState,
    }

    onChangeValue = (value) => {
        this.setState(value)
    }

    onOpenModal = () => {
        this.setState({ visible: true });
    }

    onCloseModal = () => {
        this.setState({ ...initState });
        this.props.form.resetFields()
    };


    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                const {
                    url_details,
                    description,
                    kind_speech,
                    roles_for,
                    roles_in
                } = values;

                this.props.onCreateReplay({
                    url_details,
                    description,
                    kind_speech,
                    roles_for,
                    roles_in,
                })
                this.onCloseModal();
            }
        });

    }

    renderForm() {
        const { form, project } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form colon={false}>
                <Row>
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 11 }}
                    >
                        <Form.Item label="Tipo de fala">
                            {getFieldDecorator('kind_speech', {
                                rules: [{
                                    required: true,
                                    message: 'Tipo de fala'
                                }],
                            }
                            )(
                                <Select
                                    allowClear
                                    placeholder="Selecione o tipo de fala"
                                    onChange={kind_speech => this.onChangeValue({ kind_speech })}
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) =>
                                        Search(input, option.props.children)
                                    }
                                >
                                    {KIND_OF_SPEECH_CHOICES.map(item => <Option key={item.key}>{item.text}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 11, offset: 2 }}
                    >
                        <Form.Item label="No Papel">
                            {getFieldDecorator('roles_in', {
                                rules: [{
                                    required: true,
                                    message: 'Escolha um papel'
                                }],
                            }
                            )(
                                <Select
                                    allowClear
                                    placeholder="Selecione um papel"
                                    onChange={roles_in => this.onChangeValue({ roles_in })}
                                    showSearch
                                    optionFilterProp='children'
                                    filterOption={(input, option) =>
                                        Search(input, option.props.children)
                                    }
                                >
                                    {project.roles.map(item => <Option key={item.id}>{item.name}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Para o papel">
                    {getFieldDecorator('roles_for', {
                        rules: [{
                            required: true,
                            message: 'Escolha um papel'
                        }],
                    }
                    )(
                        <Select
                            allowClear
                            mode="multiple"
                            showArrow
                            placeholder="Selecione um papel"
                            onChange={roles_for => this.onChangeValue({ roles_for })}
                            showSearch
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                Search(input, option.props.children)
                            }
                        >
                            {project.roles.map(item => <Option key={item.id}>{item.name}</Option>)}
                        </Select>
                    )}
                </Form.Item>

                <Form.Item label="Descrição">
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Digite uma descrição' }],
                    }
                    )(
                        <TextArea
                            name="description"
                            placeholder="Responder ao tópico"
                            autosize={{ minRows: 2, maxRows: 4 }}
                            onChange={e => this.onChangeValue({ description: e.target.value })}
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Link para descrição detalhada">
                    {getFieldDecorator('url_details', {
                        rules: [{ message: 'Digite o link para descrição detalhada' }],
                    }
                    )(
                        <TextArea
                            name="url_description"
                            placeholder="Link para a descrição detalhada"
                            autosize={{ minRows: 1, maxRows: 3 }}
                            onChange={e => this.onChangeValue({ url_details: e.target.value })}
                        />,
                    )}
                </Form.Item>
            </Form >
        )
    }

    render() {
        return (
            <>
                <Tooltip placement="bottomLeft" title="Comentar">
                    <Button
                        size="large"
                        type="primary"
                        className="btn-new-replay"
                        onClick={this.onOpenModal}
                    >
                        Comentar
                    </Button>
                </Tooltip>
                <Modal
                    title="Comentar Tópico"
                    visible={this.state.visible}
                    maskClosable={false}
                    onCancel={this.onCloseModal}
                    onOk={this.onSubmit}
                    okText={'Enviar Comentário'}
                    centered={true}
                >
                    {this.renderForm()}
                </Modal>
            </>
        );
    }
}
const WrappedProject = Form.create({})(ReplayModal);

export default WrappedProject;