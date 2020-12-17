import React, { Component } from 'react';
import './style.css';
import { Dropdown, Icon, Menu, Button } from 'antd';
import kindSpeechs from '~/common/kindSpeechs';
import ReplayModal from '~/screens/Topic/ReplayModal';
import moment from 'moment';
import 'moment/locale/pt-br';

export default class Replay extends Component {

    state = {
        showAllRoles: false,
    }

    toggleShowAllRoles = () => {
        this.setState(({ showAllRoles }) => ({ showAllRoles: !showAllRoles }))
    }

    onOpenImage = () => {
        this.href.click();
    }

    renderRolesFor() {
        const { roles_for } = this.props.replay;
        const isMoreRoles = roles_for.length > 1;
        const isComma = index => isMoreRoles && index !== roles_for.length - 1;

        return (
            <span>
                {roles_for.map(
                    (item, i) => {
                        if (!this.state.showAllRoles && i !== 0) {
                            return null;
                        }
                        return <b> {item.name}{isComma(i) && ','}</b>
                    }
                )}
                {
                    isMoreRoles
                    && <Button
                        type="link"
                        size="small"
                        onClick={this.toggleShowAllRoles}
                    >
                        {this.state.showAllRoles ? 'ver menos' : 'mais...'}
                    </Button>
                }
            </span>
        )

    }

    render() {
        const { replay, account, removeReplay, topic, project } = this.props;
        const isMyReplay = account.email === replay.author.email;

        const menu = (
            <Menu>
                <Menu.Item key="1" >
                    <Button type="link" onClick={removeReplay(replay.id)}>Excluir</Button>
                </Menu.Item >
                <Menu.Item key="2" >
                    <ReplayModal project={project} topic={topic} replay={replay} />
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={["replay", isMyReplay && 'my_replay '].join(' ')}>
                <div className="replay-card">
                    <div className="card-header">
                        <div className="info-replay">
                            <span className="kind-speech">
                                {kindSpeechs[replay.kind_speech]}:
                            </span> O(A) <b>{replay.author.name.split(" ", 1)} </b>
                                no papel <b>{replay.roles_in.name} </b>
                                para {this.renderRolesFor()}

                        </div>
                        {
                            isMyReplay && (
                                <Dropdown className="dropdown" overlay={menu} trigger="click" placement="topLeft">
                                    <Icon type="more" className="icon" />
                                </Dropdown>
                            )
                        }
                    </div>
                    <div className="card-body">
                        <div className="desc">{replay.description}</div>
                        {
                            replay.image_details &&
                            <>
                                <img
                                    onClick={this.onOpenImage}
                                    className="image"
                                    alt="descrição detalhada"
                                    src={replay.image_details}
                                />
                                <a
                                    ref={ref => this.href = ref}
                                    href={replay.image_details}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    ver mais da descrição detalhada
                                </a>
                            </>


                        }
                    </div>
                    <div className="card-footer">
                        <span>{`criado em ${moment(replay.created_at).format('DD/MM/YYYY')}`}</span>
                    </div>
                </div>
            </div >
        );
    }
}
