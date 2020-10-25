import { createStore, applyMiddleware, /* compose */ } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
//const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(
    reducers,
    // composeEnhancer(applyMiddleware(thunk, sagaMiddleware, logger)),
    applyMiddleware(thunk, sagaMiddleware, logger)
)
sagaMiddleware.run(sagas);

export default store;