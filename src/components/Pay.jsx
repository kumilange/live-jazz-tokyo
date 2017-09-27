import React, { Component } from 'react';

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

export default Pay;
