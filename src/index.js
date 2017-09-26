import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { StripeProvider } from 'react-stripe-elements';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './styles/reset.css';
import './styles/index.css';
import reducer from './reducers';
import Header from './containers/Header';
import App from './containers/App';
import Event from './containers/Event';
import User from './containers/User';
import Pay from './containers/Pay';
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
        <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
          <div id="router">
            <Header />
            <Route exact path="/" component={App} />
            <Route exact path="/event/:id" component={Event} />
            <Route exact path="/user" component={User} />
            <Route exact path="/pay" component={Pay} />
            <Route exact path="/confirmation" component={Confirmation} />
            <Route exact path="/addevent" component={AddEvent} />
            <Footer />
          </div>
        </StripeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
