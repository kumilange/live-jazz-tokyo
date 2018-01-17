import React from 'react';
import PropTypes from 'prop-types';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { TextField, RaisedButton, Dialog } from 'material-ui';

import './CheckoutForm.css';

const stripeStyle = {
  base: {
    color: 'black',
    '::placeholder': {
      color: '#AAAC98',
    },
    fontSize: '16px',
    lineHeight: '24px',
  },
  complete: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  },
};

const CheckoutForm = ({ nameErrorText, addressErrorText, emailErrorText, creditCardError, setCreditCardError, handleSubmit }) => {
  const actions = [
    <RaisedButton
      primary
      label="OK"
      onClick={setCreditCardError}
    />,
  ];
  return (
    <form onSubmit={handleSubmit} className="flex column center">
      <ul id="payment-info-table">
        <li className="flex">
          <p className="list-title">Card Holder:</p>
          <div className="list-item">
            <TextField
              id="card-holder-field"
              hintText="John Smith"
              errorText={nameErrorText}
            />
          </div>
        </li>
        <li className="flex">
          <p className="list-title">Billing Address:</p>
          <div className="list-item">
            <TextField
              id="address-field"
              hintText="123 New Orleans"
              errorText={addressErrorText}
            />
          </div>
        </li>
        <li className="flex">
          <p className="list-title">E-mail:</p>
          <div className="list-item">
            <TextField
              id="email-field"
              hintText="test@example.com"
              errorText={emailErrorText}
            />
          </div>
        </li>
        <li className="flex">
          <p className="list-title">Card Number:</p>
          <div className="list-item">
            <div className="underline">
              <CardNumberElement style={stripeStyle} />
            </div>
          </div>
        </li>
        <li className="flex">
          <p className="list-title">Expiry Date:</p>
          <div id="expiry-date" className="list-item">
            <div className="underline">
              <CardExpiryElement style={stripeStyle} />
            </div>
          </div>
          <p id="cvc">CVC:</p>
          <div className="list-item">
            <div className="underline">
              <CardCVCElement style={stripeStyle} />
            </div>
          </div>
        </li>
      </ul>
      <RaisedButton primary className="order-button" label="Confirm Order" type="submit" />
      <Dialog
        title="Error"
        actions={actions}
        modal={false}
        open={creditCardError}
        onRequestClose={setCreditCardError}
      >
          Please input a valid credit card.
      </Dialog>
    </form>
  );
};

CheckoutForm.propTypes = {
  nameErrorText: PropTypes.string.isRequired,
  addressErrorText: PropTypes.string.isRequired,
  emailErrorText: PropTypes.string.isRequired,
  creditCardError: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setCreditCardError: PropTypes.func.isRequired,
};

export default CheckoutForm;
