import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import './styles/index.css';
import reducer from './reducers';
import App from './containers/App';
import Event from './containers/Event';

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div id="router">
        <Route exact path="/" component={App} />
        <Route exact path="/event/:id" component={Event} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
