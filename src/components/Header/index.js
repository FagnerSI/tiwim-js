import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Button, Dropdown, Menu } from 'antd';
import { getRoute, routesNames } from '~/screens/routes';
import './style.css';

import {
    logout,
} from '~/store/authentication/action';


class Header extends Component {

    onLogout = () => {
        this.props.history.push(getRoute(routesNames.Login).path)
        this.props.dispatch(logout())
    }

    renderMenu() {
        return (
            <Menu>
                <Menu.Item>
                    <Button type="link" icon="setting">
                        Perfil
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button type="link" onClick={this.onLogout} icon="logout">
                        Sair
                    </Button>
                </Menu.Item>
            </Menu>)
    }

    render() {
        const { name } = this.props.account.payload;
        const shortName = name.split(' ', 2).join(' ');

        return (
            <div className="header">
                <span>TiWIM</span>
                <div className="profile-container">
                    <span className="profile-name">Olá, {shortName}</span>
                    <Dropdown overlay={this.renderMenu()} placement="bottomRight">
                        <Button
                            type="primary"
                            className="btn-circle-icon"
                            icon="user"
                        />
                    </Dropdown>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        account: state.account,
    }
}


export default compose(
    connect(mapStateToProps),
    withRouter,
)(Header)