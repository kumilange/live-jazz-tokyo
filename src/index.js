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

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div id="router" className="flex column">
        <Header />
        <main className="grow">
          <Route exact path="/" component={App} />
          <Route exact path="/event/:id" component={Event} />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
