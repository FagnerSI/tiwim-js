import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from '~/store';

import RouteWrapper from '~/components/RouteWrapper';
import routes from '~/screens/routes';

import {
  currentToken,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
} from '~/store/authentication/action';


import account from '~/store/account/action';

export const AppContext = React.createContext({
  isAuthenticated: false,
});

type Props = {
  isAuthenticated: boolean, 
  ...RouterProps,
};

class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const { authentication } = store.getState();

      let prev = { authentication: '' }
      if (prev.authentication !== authentication) {
        switch (authentication.type) {
          case AUTHENTICATION_SUCCESS:
          case GET_TOKEN_SUCCESS: {
            this.setState({ isLoading: false, isAuthenticated: true });
            break;
          }
          case AUTHENTICATION_FAILURE:
          case GET_TOKEN_FAILURE:
            this.setState({ isLoading: false, isAuthenticated: false });
            break;
          default:
        }
      }
      prev = Object.assign(prev, { authentication });
    });
    store.dispatch(account());
    store.dispatch(currentToken())
  }

  renderNavigation() {
    //const { headerValues, navigationValues } = this.state;

    return (
      <div>
        <Switch>
          {
            Object.values(routes.routesNames).map((routeName, index) => {
              const route = routes.getRoute(routeName);
              if (!route) return null;
              return (
                <RouteWrapper key={index} {...route} />
              );
            })
          }

          {/* 
          Essa rota deve ser a última 
          <RouteWrapper {...routes.getRoute(routes.routesNames.NotFound)} />
          */}
        </Switch>
      </div>
    );
  }

  render() {
    const { isAuthenticated, isLoading, } = this.state;

    if (isLoading) return null;

    return (
      <BrowserRouter>
        <Provider store={store}>
          <AppContext.Provider
            value={{
              isAuthenticated,
            }}
          >
            {this.renderNavigation()}
          </AppContext.Provider>
        </Provider>
      </BrowserRouter >
    );
  }
}
export default App;