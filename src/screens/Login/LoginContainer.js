import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';

import { getRoute, routesNames } from '~/screens/routes';

import login, {
    AUTHENTICATION_SUCCESS,
} from '~/store/authentication/action';
import createAccount, {
    CREATE_ACCOUNT_SUCCESS
} from '~/store/createAccount/action';

class LoginContainer extends Component {

    componentDidUpdate(prevProps) {
        const { authentication, createAccount, history } = this.props;

        (() => {
            if (prevProps.authentication.type !== authentication.type) {
                if (authentication.type === AUTHENTICATION_SUCCESS) {
                    history.push(getRoute(routesNames.Home).path)
                };
            }
        })();
        (() => {
            if (prevProps.createAccount.type !== createAccount.type) {
                if (createAccount.type === CREATE_ACCOUNT_SUCCESS) {
                    this.onLogin(this.state);
                };
            }
        })();
    }

    onLogin = ({ email, password }) => {
        this.props.dispatch(login(email, password))
    }

    onCreateAccount = (values) => {
        this.setState({ ...values })
        this.props.dispatch(createAccount(values))
    }

    render() {
        return <Login onLogin={this.onLogin} onCreateAccount={this.onCreateAccount} />;
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
        createAccount: state.createAccount,
    }
}

export default connect(mapStateToProps)(LoginContainer);