import React, { Component } from 'react';
import './style.css';
import kindSpeechs from '~/common/kindSpeechs';

export default class Replay extends Component {


    render() {
        const { replay } = this.props;
        return (
            <div className="replay-card">
                <div className="card-header">
                    <span className="kind-speech">{kindSpeechs[replay.kind_speech]}</span>
                    <div className="user-replay">
                        <span>{replay.user.name}</span>
                    </div>
                </div>
                <div className="card-body">
                    <span className="roles">
                        <span className="role-in"><b>No papel:</b> {replay.roles_in.name}</span>
                        <b>Para:</b> {replay.roles_for.name}
                    </span>
                    <p className="desc">{replay.description}</p>
                    {/* <div>Descrição detalhada</div> */}
                </div>
            </div>
        );
    }
}
