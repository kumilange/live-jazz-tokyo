import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './styles/reset.css';
import './styles/index.css';
import reducer from './reducers';
import Header from './containers/Header';
import App from './containers/App';
import Event from './containers/Event';
import User from './containers/User';
import Footer from './components/Footer';
import Confirmation from './containers/Confirmation';
import AddEvent from './containers/AddEvent';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

const muiTheme = getMuiTheme({
  fontFamily: 'LogoTypeGothicCondense',
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id="router">
          <Header />
          <Route exact path="/" component={App} />
          <Route exact path="/event/:id" component={Event} />
          <Route exact path="/user" component={User} />
          <Route exact path="/confirmation" component={Confirmation} />
          <Route exact path="/addevent" component={AddEvent} />
          <Footer />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
