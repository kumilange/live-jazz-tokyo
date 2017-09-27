import React, { Component } from 'react';

import { Elements } from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';

import '../styles/Pay.css';

class Pay extends Component {
  render() {
    return (
      <main className="restrict-width">
        <Elements>
          <CheckoutForm
            userProfile={this.props.userProfile}
            eventID={this.props.event.id}
            creditCardError={this.props.creditCardError}
            setCreditCardError={this.props.setCreditCardError}
            nameErrorText={this.props.nameErrorText}
            addressErrorText={this.props.addressErrorText}
            emailErrorText={this.props.emailErrorText}
            setNameErrorText={this.props.setNameErrorText}
            setAddressErrorText={this.props.setAddressErrorText}
            setEmailErrorText={this.props.setEmailErrorText}
          />
        </Elements>
      </main>
    );
  }
}

export default Pay;
