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
import KIND_OF_SPEECH_CHOICES from '~/common/kindSpeechsSelect';
import { isEmpty } from 'underscore';
import Search from '~/common/SearchField';
import getAtrrInArray from '~/common/getAtrrInArray';

const { TextArea } = Input;
const { Option } = Select;
const allRoles = { id: 'All', name: 'Todos os papeis' };

const initState = {
    image_details: '',
    description: '',
    kind_speech: '',
    roles_for: [allRoles.id],
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

    setRolesForState = (roles_for = ['All']) => {
        this.setState({
            roles_for
        }, () =>
            this.props.form.setFieldsValue({
                roles_for
            })
        )
    }

    onOpenModal = () => {
        const { replay, lastReplay, project } = this.props;
        const roles_in = lastReplay && lastReplay.roles_in
            ? `${lastReplay.roles_in}` : null;

        this.setRolesForState();

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
                description,
                kind_speech,
                roles_for,
                roles_in,
            } = replay;

            const rolesFor = roles_for
                && project
                && roles_for.length === project.roles.length
                ? [allRoles.id]
                : getAtrrInArray('id', roles_for);

            this.setState({
                description,
                kind_speech,
                roles_for: rolesFor,
                roles_in
            },
                () => {
                    this.props.form.setFieldsValue({
                        description: this.state.description,
                        kind_speech: this.state.kind_speech,
                        roles_for: rolesFor,
                        roles_in: String(this.state.roles_in.id)
                    })
                }

            )
        }

        this.setState({ visible: true });
    }

    onPress = () => {
        this.input.click();
    };

    onClearImage = () => {
        this.setState({ fileName: '', image_details: '' });
        this.input.value = '';
    }

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
        this.setState({ [key]: value },
            () => {
                if (key === 'roles_for') {
                    this.onCheckSelectRolesFor();
                }
            }
        )
    }

    onCheckSelectRolesFor = () => {
        const { roles_for } = this.state;
        const { project } = this.props;
        /*   
            If list of roles has more than one item,
            verify if one of them is "All" and remove
        */
        if (roles_for && project && project.roles) {
            if (roles_for.length
                //&& roles_for.length !== project.roles.length
            ) {
                const rolesFor = roles_for.filter(item => item !== allRoles.id);
                this.setRolesForState(rolesFor);
                return;
            }
            else {
                this.setRolesForState();
            }
        }
    }


    onSubmit = () => {
        this.props.form.validateFields((err, values) => {

            if (!err || isEmpty(err)) {
                const { image_details, roles_for } = this.state;

                //If selected option is "All", then add all roles
                const rolesFor = roles_for[0] === allRoles.id
                    ? getAtrrInArray('id', this.props.project.roles)
                    : roles_for;

                const replay = image_details
                    ? { ...values, roles_for: rolesFor, image_details }
                    : { ...values, roles_for: rolesFor }

                if (this.props.replay) {
                    this.props.onUpdateReplay(replay)
                } else {
                    this.props.onCreateReplay(replay)
                }

                this.onCloseModal();
            }
        });

    }

    renderForm() {
        const { form, project, replay } = this.props;
        const { getFieldDecorator } = form;
        const { fileName, loadingFile } = this.state;
        const fileSelected = fileName && fileName.length >= 30
            ? fileName.substring(0, 30)
            : fileName;
        const titleButtonFile = replay ? 'Substituir Imagem' : 'Selecionar Imagem';
        const roles = [...project.roles, allRoles];

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
                            {roles.map(item => {
                                return <Option key={item.id} disabled={item.id === allRoles.id}>{item.name}</Option>
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
                        {loadingFile ? 'Carregando Imagem' : titleButtonFile}
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
                            <Button
                                type="danger"
                                ghost
                                icon="close"
                                shape="circle"
                                onClick={this.onClearImage}
                            />
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
