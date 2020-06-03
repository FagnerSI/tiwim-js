import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Menu } from 'antd';

import './style.css';

import {
    logout,
} from '~/store/authentication/action';


class Header extends Component {

    renderMenu() {
        return (
            <Menu>
                <Menu.Item>
                    <Button
                        type="link"
                        onClick={() => this.props.dispatch(logout())}
                    >
                        Sair
                    </Button>
                </Menu.Item>
            </Menu>)
    }

    render() {
        return (
            <div className="header">
                <span>TiWIM</span>
                <Dropdown overlay={this.renderMenu()} placement="bottomRight">
                    <Button
                        type="primary"
                        className="btn-circle-icon"
                        icon="user"
                    />
                </Dropdown>
            </div>
        )
    }

}


export default connect()(Header)