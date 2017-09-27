import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';

import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styleProps = {
  base: {
    color: 'black',
    '::placeholder': {
      color: '#ABAB9A',
    },
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

class CheckoutForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(async (response) => {
      const stripeToken = response.token;

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Bearer', this.props.userProfile.jwt);

      const res = await (await fetch('/api/charge', {
        method: 'POST',
        body: JSON.stringify({
          stripeToken,
          eventID: this.props.eventID,
        }),
        headers,
      })).json();
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex column center">
        <table id="payment-info-table">
          <tbody>
            <tr>
              <td>Card Holder:</td>
              <td colSpan="3"><TextField hintText="John Smith" /></td>
            </tr>
            <tr>
              <td>Billing Address:</td>
              <td colSpan="3"><TextField hintText="123 New Orleans" /></td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td colSpan="3"><TextField hintText="test@example.com" /></td>
            </tr>
            <tr>
              <td>Card Number:</td>
              <td colSpan="3">
                <div className="underline">
                  <CardNumberElement style={styleProps} />
                </div>
              </td>
            </tr>
            <tr>
              <td>Expiry Date:</td>
              <td id="expiry-date">
                <div className="underline">
                  <CardExpiryElement style={styleProps} />
                </div>
              </td>
              <td id="cvc">CVC:</td>
              <td>
                <div className="underline">
                  <CardCVCElement style={styleProps} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <RaisedButton primary label="Confirm Order" type="submit" />
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
