import React, { Component } from 'react';
import {
    Button,
    Form,
    Input,
    Modal,
    Row,
    Col,
    Select,
    Icon,
    Typography,
    Divider,
} from 'antd';
import 'antd/dist/antd.css';

import { isEmpty } from 'underscore';
import Search from '~/common/SearchField';
import getAtrrInArray from '~/common/getAtrrInArray';

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
    image_details: '',
    description: '',
    kind_speech: '',
    roles_for: [],
    roles_in: '',
    fileName: '',
    loadingFile: false,
    visible: false,
}

const reader = new FileReader();
class ReplayModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initState,
        };
        reader.onload = this.onLoadReader;
        reader.onloadstart = this.onStartLoad;
        reader.onloadend = this.onLoadend;
    }

    onOpenModal = () => {
        const { replay, lastReplay } = this.props;
        const roles_in = lastReplay && lastReplay.roles_in
            ? String(lastReplay.roles_in) : null;

        if (roles_in) {
            this.setState({
                roles_in
            }, () =>
                this.props.form.setFieldsValue({
                    roles_in: this.state.roles_in
                })
            )
        }

        if (replay) {
            const {
                image_details,
                description,
                kind_speech,
                roles_for,
                roles_in,
            } = replay;

            this.setState({
                image_details,
                description,
                kind_speech,
                roles_for,
                roles_in
            },
                () => {
                    this.props.form.setFieldsValue({
                        description: this.state.description,
                        kind_speech: this.state.kind_speech,
                        roles_for: getAtrrInArray('id', this.state.roles_for),
                        roles_in: String(this.state.roles_in.id)
                    })
                }

            )
        }

        this.setState({ visible: true });
    }

    onPress = (entry) => {
        this.input.click();
    };

    onFileOk = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.setState({ fileName: file.name })
            reader.readAsDataURL(file);
        }
    };

    onLoadReader = (reader) => {
        this.setState({ image_details: reader.target.result });
    };

    onStartLoad = () => {
        this.setState({ loadingFile: true })
    }

    onLoadend = () => {
        setTimeout(() => {
            this.setState({ loadingFile: false })
        }, 750);
    }

    onCloseModal = () => {
        this.setState({ ...initState });
        this.props.form.resetFields()
    };

    onChangeValue = (key) => (e) => {
        const value = e && e.target ? e.target.value : e;
        this.setState({ [key]: value })
    }


    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err || isEmpty(err)) {
                const { image_details } = this.state;
                if (this.props.replay) {
                    this.props.onUpdateReplay({ ...values, image_details })
                } else {
                    this.props.onCreateReplay({ ...values, image_details })
                }

                this.onCloseModal();
            }
        });

    }

    renderForm() {
        const { form, project } = this.props;
        const { getFieldDecorator } = form;
        const { fileName, loadingFile } = this.state;
        const fileSelected = fileName && fileName.length >= 35
            ? fileName.substring(0, 35)
            : fileName;

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
                                    onChange={this.onChangeValue('kind_speech')}
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
                                    onChange={this.onChangeValue('roles_in')}
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
                            onChange={this.onChangeValue('roles_for')}
                            showSearch
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                Search(input, option.props.children)
                            }
                        >
                            {project.roles.map(item => {
                                return <Option key={item.id}>{item.name}</Option>
                            }
                            )}
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
                            onChange={this.onChangeValue('description')}
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Descrição detalhada">
                    <Button
                        loading={loadingFile}
                        onClick={this.onPress}
                        icon='upload'
                    >
                        {loadingFile ? 'Carregando Imagem' : 'Selecionar Imagem'}
                    </Button>
                    {
                        fileSelected
                        && !loadingFile
                        && <span>
                            <Divider type="vertical" />
                            <Icon type="paper-clip" />
                            <Typography.Text strong>
                                {fileSelected}
                            </Typography.Text>
                        </span>
                    }
                    <input
                        style={{ display: 'none' }}
                        ref={ref => this.input = ref}
                        type="file"
                        accept="image/*"
                        onChange={this.onFileOk}
                    />
                </Form.Item>
            </Form >
        )
    }

    render() {
        const { replay } = this.props;

        return (
            <>
                <Button
                    block
                    size={replay ? "default" : "large"}
                    type={replay ? "link" : "primary"}
                    onClick={this.onOpenModal}
                >
                    {replay ? "Editar" : "Escrever Mensagem"}
                </Button>
                <Modal
                    title={replay ? "Atualizar Mensagem" : "Criar Mensagem"}
                    visible={this.state.visible}
                    maskClosable={false}
                    onCancel={this.onCloseModal}
                    onOk={this.onSubmit}
                    okText={replay ? "Aatualizar Mensagem" : 'Enviar Mensagem'}
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
