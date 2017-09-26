import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Elements } from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';

import '../styles/Pay.css';

class Pay extends Component {
  render() {
    return (
      <main className="restrict-width">
        <Elements>
          <CheckoutForm />
        </Elements>
      </main>
    );
  }
}

Pay.propTypes = {
  
};

Pay.defaultProps = {
  
};

export default Pay;
