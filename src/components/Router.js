import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import reducer from '../reducers';
import App from '../containers/App';
import '../styles/index.css';

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div id="router">
        <Route path="/" component={App} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
