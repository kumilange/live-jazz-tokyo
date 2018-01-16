import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StripeProvider } from 'react-stripe-elements';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

import './sharedStyles/reset.css';
import './sharedStyles/common.css';
import './sharedStyles/index.css';
import reducer from './reducers';
import App from './components/templates/App/App';
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
    <MuiThemeProvider muiTheme={muiTheme}>
      <StripeProvider apiKey={STRIPE_API_KEY}>
        <App />
      </StripeProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
