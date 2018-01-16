import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { StripeProvider } from 'react-stripe-elements';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

import './sharedStyles/reset.css';
import './sharedStyles/common.css';
import './sharedStyles/index.css';
import reducer from './reducers';
import Header from './containers/organisms/Header';
import App from './containers/templates/App';
import Event from './containers/organisms/Event';
import User from './containers/organisms/User';
import Pay from './containers/organisms/Pay';
import Footer from './components/organisms/Footer/Footer';
import Confirmation from './containers/organisms/Confirmation';
import AddEvent from './containers/organisms/AddEvent';
import { STRIPE_API_KEY } from './config/const';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

const muiTheme = getMuiTheme({
  fontFamily: 'LogoTypeGothic',
  palette: {
    primary1Color: '#DAA520',
    primary2Color: '#DAA520',
    pickerHeaderColor: '#DAA520',
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <StripeProvider apiKey={STRIPE_API_KEY}>
          <div id="router">
            <Header />
            <Route exact path="/" component={App} />
            <Route exact path="/event/:id" component={Event} />
            <Route exact path="/user/:id" component={User} />
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
