import React, { Component } from 'react';
import Stripe from 'react-stripe-checkout';

class Reserve extends Component {
  onToken(token) {
    console.log(token);
  }

  render() {
    return (
      <div>
        <Stripe
          token={this.onToken}
          stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
        />
      </div>
    );
  }
}

export default Reserve;

