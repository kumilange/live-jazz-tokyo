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
import Confirmation from './containers/Confirmation';
import AddEvent from './containers/AddEvent';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div id="router">
        <Route exact path="/" component={App} />
        <Route exact path="/event/:id" component={Event} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/addevent" component={AddEvent} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
