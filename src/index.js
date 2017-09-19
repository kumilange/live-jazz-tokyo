import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import './styles/index.css';
import reducer from './reducers';
import App from './containers/App';
import Event from './containers/Event';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

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
