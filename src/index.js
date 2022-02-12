import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from "./Redux/rootReducer";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import saga from './Redux/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

