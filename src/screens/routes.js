import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Topic from './Topic';

const Routers = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/topics/:id" component={Topic} />
        </Switch>
    </BrowserRouter>
)

export default Routers;