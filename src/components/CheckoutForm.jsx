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



    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex column center">
        <ul id="payment-info-table">
          <li className="flex">
            <p className="listTtl">Card Holder:</p>
            <div className="listItem">
              <TextField hintText="John Smith" />
            </div>
          </li>
          <li className="flex">
            <p className="listTtl">Billing Address:</p>
            <div className="listItem">
              <TextField hintText="123 New Orleans" />
            </div>
          </li>
          <li className="flex">
            <p className="listTtl">E-mail:</p>
            <div className="listItem">
              <TextField hintText="test@example.com" />
            </div>
          </li>
          <li className="flex">
            <p className="listTtl">Card Number:</p>
            <div className="listItem">
              <div className="underline">
                <CardNumberElement style={styleProps} />
              </div>
            </div>
          </li>
          <li className="flex">
            <p className="listTtl">Expiry Date:</p>
            <div id="expiry-date" className="listItem">
              <div className="underline">
                <CardExpiryElement style={styleProps} />
              </div>
            </div>
            <p id="cvc">CVC:</p>
            <div className="listItem">
              <div className="underline">
                <CardCVCElement style={styleProps} />
              </div>
            </div>
          </li>
        </ul>
        <RaisedButton primary className="orderButton" label="Confirm Order" type="submit" />
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
