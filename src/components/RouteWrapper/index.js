import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { compose } from 'recompose';
import { AppContext } from '~/App';

type Props = {
    history?: any,
    location?: any,
    account?: any,
    privateRoute?: boolean,
    component: React.ReactNode,
};

class RouteWrapper extends Component<Props> {
    state = {};

    render() {
        const {
            component: Child, privateRoute, ...rest
        } = this.props;
        if (!Child) return null;


        return (
            <AppContext.Consumer>
                {({
                    header, isAuthenticated,
                }) => (
                        <Route
                            {...rest}
                            render={props => {

                                if (privateRoute && !isAuthenticated) {
                                    return <Redirect to="/login" />;
                                }

                                return (
                                    <Child
                                        header={header}
                                        {...props}
                                        {...props.location.state}
                                    />
                                );
                            }
                            }
                        />
                    )
                }
            </AppContext.Consumer>
        );
    }
}


export default compose(
    withRouter,
)(RouteWrapper);
