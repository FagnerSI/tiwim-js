import React, { Component } from 'react';
import {
    Button,
    Form,
    Tooltip,
    Modal,
} from 'antd';
import { InfosBasic, Roles, Members } from './components';
import getAtrrInArray from '~/common/getAtrrInArray';
import 'antd/dist/antd.css';

const initState = {
    name: '',
    description: '',
    members: [],
    roles: [],
    indexStep: 0,
    visible: false,
}

const steps = [
    {
        title: 'Dados da discussão',
        component: 'BASIC',
    },
    {
        title: 'Adicionar papéis',
        component: 'ROLES',
    },
    {
        title: 'Adicionar membros',
        component: 'MEMBERS'
    },
]

class ProjectModal extends Component {
    state = {
        ...initState,
    }

    onOpenModal = () => {
        const { getData, isUpdateProject, project } = this.props

        getData();
        this.setState({ visible: true });

        if (isUpdateProject && project) {
            this.setState(
                {
                    name: project.name,
                    description: project.description,
                    members: this.removeUserLoggedOfMembers(),
                    roles: getAtrrInArray('id', project.roles),
                }
            )
        };
    };


    removeUserLoggedOfMembers = () => {
        const { project } = this.props;
        if (project) {
            let membersIds = getAtrrInArray("id", project.members);
            let indexRemove = membersIds.indexOf(this.props.account.id);
            membersIds.splice(indexRemove, 1);
            return membersIds;
        }
    }

    onCloseModal = () => {
        this.setState({ ...initState });
    };

    onSuccess = (values) => {
        this.setState({
            ...values
        }, () => this.onNext());
    }

    onPrevious = () => {
        const { indexStep } = this.state;
        this.setState({ indexStep: indexStep - 1 })
    }

    onNext = () => {
        const { indexStep } = this.state;

        if (indexStep === steps.length - 1) {
            return this.onSubmit();
        } else {
            this.setState({ indexStep: indexStep + 1 })
        }
    }

    onSubmit = () => {
        let {
            name, description, members, roles
        } = this.state;

        members.push(this.props.account.id);

        this.props.onSuccess({
            name, description, members, roles
        })

        this.onCloseModal();
    }

    renderBasic() {
        const {
            name,
            description
        } = this.state;
        return (
            <InfosBasic
                name={name}
                description={description}
                onSuccess={this.onSuccess}
            />
        )
    }

    renderRoles() {
        const {
            onCreateRole,
            allRoles,
            currentRoleId,
            loading,
        } = this.props
        return (
            <Roles
                loading={loading}
                allRoles={allRoles}
                roles={this.state.roles}
                currentRoleId={currentRoleId}
                onCreateRole={onCreateRole}
                onPrevious={this.onPrevious}
                onSuccess={this.onSuccess}
            />
        )
    }

    renderMembers() {
        const {
            users,
            loading,
            currentMemberId,
            onCreateAccount,
            isUpdateProject,
        } = this.props

        return (
            <Members
                isUpdateProject={isUpdateProject}
                loading={loading}
                users={users}
                members={this.state.members}
                currentMemberId={currentMemberId}
                onCreateAccount={onCreateAccount}
                onPrevious={this.onPrevious}
                onSuccess={this.onSuccess}
            />
        )
    }

    render() {
        const { isUpdateProject } = this.props
        const { indexStep } = this.state;
        const currentStep = steps[indexStep];

        const stepsComponnets = {
            BASIC: this.renderBasic(),
            ROLES: this.renderRoles(),
            MEMBERS: this.renderMembers(),
        };

        return (
            <>
                <Tooltip placement='bottomRight' title={isUpdateProject ? "Atualizar Discussão" : "Criar nova Discussão"}>
                    <Button
                        type={"primary"}
                        ghost={isUpdateProject}
                        icon={isUpdateProject ? "edit" : "plus"}
                        onClick={this.onOpenModal}
                    />
                </Tooltip>
                <Modal
                    title={isUpdateProject ? "Editar Discussão" : "Criar Discussão"}
                    visible={this.state.visible}
                    maskClosable={false}
                    onCancel={this.onCloseModal}
                    footer={null}
                    centered={true}
                >

                    <h3 style={{ textAlign: 'center' }}>
                        {steps[indexStep].title}
                    </h3>
                    {stepsComponnets[currentStep.component]}

                </Modal>
            </>
        );
    }
}
const WrappedProject = Form.create({})(ProjectModal);

export default WrappedProject;