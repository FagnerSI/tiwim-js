import React, { Component } from 'react';
import './style.css';
import { Tag, Dropdown, Icon, Menu, Button } from 'antd';
import kindSpeechs from '~/common/kindSpeechs';
import ReplayModal from '~/screens/Topic/ReplayModal';
import moment from 'moment';
import 'moment/locale/pt-br';

export default class Replay extends Component {
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
                        <span className="kind-speech">{kindSpeechs[replay.kind_speech]}</span>
                        <div className="user-replay">
                            <span>{replay.author.name}</span>
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
                        <span className="roles">
                            <span className="role-in">
                                <b>No papel: </b><Tag>{replay.roles_in.name}</Tag>
                            </span>
                            <b>Para: </b>
                            {replay.roles_for.map(item => <Tag>{item.name}</Tag>)}
                        </span>
                        <p className="desc">{replay.description}</p>
                        {
                            replay.url_details &&
                            <div className="link">Link:
                                <a href={replay.url_details}> {replay.url_details}</a>
                            </div>

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
