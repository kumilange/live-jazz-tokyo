import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';

import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styleProps = {
  base: {
    color: 'black',
    fontSize: '16px',
    lineHeight: '24px',
  },
  complete: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  }
};

class CheckoutForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();



    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex column center">
        <table id="payment-info-table">
          <tbody>
            <tr>
              <td>Card Number:</td>
              <td>
                <div className="underline">
                  <CardNumberElement style={styleProps} />
                </div>
              </td>
            </tr>
            <tr>
              <td>Expiry Date:</td>
              <td>
                <div className="underline">
                  <CardExpiryElement style={styleProps} />
                </div>
              </td>
            </tr>
            <tr>
              <td>CVC:</td>
              <td>
                <div className="underline">
                  <CardCVCElement style={styleProps} />
                </div>
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td><TextField hintText="test@example.com" /></td>
            </tr>
          </tbody>
        </table>
        <RaisedButton primary label="Confirm Order" type="submit" />
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
