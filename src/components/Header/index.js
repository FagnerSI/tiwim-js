import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { logo_white } from '~/assets'
import { Button, Dropdown, Menu } from 'antd';
import { getRoute, routesNames } from '~/screens/routes';
import AccountUpdate from '~/components/AccountUpdate';
import './style.css';

import {
    logout,
} from '~/store/authentication/action';


class Header extends Component {
    state = {
        showAccount: false
    }

    onLogout = () => {
        this.props.history.push(getRoute(routesNames.Login).path)
        this.props.dispatch(logout())
    }

    toggleModalAccount = () => {
        this.setState(({ showAccount }) => ({ showAccount: !showAccount }))
    }

    renderMenu() {
        return (
            <Menu>
                <Menu.Item>
                    <Button type="link" icon="user" onClick={this.toggleModalAccount}>
                        Editar Perfil
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

        return [
            <div className="header">
                <div className="header-logo-container">
                    <img
                        src={logo_white}
                        className="header-logo"
                        alt="Logo da plataforma"
                    />
                    <span className="header-logo-subtitle">This is What I Mean</span>
                </div>
                <div className="profile-container">
                    <span className="profile-name">Olá, {shortName}</span>
                    <Dropdown overlay={this.renderMenu()} placement="bottomRight">
                        <Button
                            // type="primary"
                            className="btn-circle-user"
                            icon="setting"
                        />
                    </Dropdown>
                </div>

            </div>,
            <AccountUpdate
                visibility={this.state.showAccount}
                onClose={this.toggleModalAccount}
            />
        ]
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