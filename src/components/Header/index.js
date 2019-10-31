import React, { Component } from 'react';
import { Button, Icon } from 'antd';

import './style.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <span>TiWIM</span>
                <Button
                    type="primary"
                    className="btn-primary"
                    onClick={this.onToggleModal}
                >
                    <Icon type="user" />
                </Button>
            </div>
        )
    }

}
