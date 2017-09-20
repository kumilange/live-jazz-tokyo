import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/index.css';
import reducer from './reducers';
import Header from './components/Header';
import App from './containers/App';
import Event from './containers/Event';
import Footer from './components/Footer';
import Confirmation from './containers/Confirmation';

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div id="router" className="flex column">
        <Header />
        <Route exact path="/" component={App} />
        <Route exact path="/event/:id" component={Event} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
