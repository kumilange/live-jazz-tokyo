import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { StripeProvider } from 'react-stripe-elements';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

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
