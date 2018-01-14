import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

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
  },
};
// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class CheckoutForm extends Component {
  componentDidMount() {
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    const { stripe, eventId, jwt, history, setNameErrorText, setAddressErrorText, setEmailErrorText, setChargeResponse, setCreditCardError } = this.props;
    event.preventDefault();

    let error = false;
    if (document.getElementById('card-holder-field').value === '') {
      setNameErrorText('Card holder name is required');
      error = true;
    } else {
      setNameErrorText('');
    }
    if (document.getElementById('address-field').value === '') {
      setAddressErrorText('Billing address is required');
      error = true;
    } else {
      setAddressErrorText('');
    }
    if (document.getElementById('email-field').value === '') {
      setEmailErrorText('E-mail address is required');
      error = true;
    } else if (!emailRegex.test(document.getElementById('email-field').value)) {
      setEmailErrorText('E-mail address is not valid');
      error = true;
    } else {
      setEmailErrorText('');
    }

    if (!error) {
      stripe.createToken({
        name: document.getElementById('card-holder-field').value,
      }).then(async (response) => {
        const stripeToken = response.token;

        if (stripeToken) {
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Bearer', jwt);

          const res = await (await fetch('/api/charge', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              stripeToken,
              eventId,
            }),
          })).json();

          if (res.OK) {
            setChargeResponse(res);
            history.push('/confirmation');
          } else {
            setCreditCardError();
          }
        } else {
          setCreditCardError();
        }
      });
    }
  }

  render() {
    const { nameErrorText, addressErrorText, emailErrorText, creditCardError, setCreditCardError } = this.props;
    const actions = [
      <RaisedButton
        primary
        label="OK"
        onClick={setCreditCardError}
      />,
    ];

    return (
      <form onSubmit={this.handleSubmit} className="flex column center">
        <ul id="payment-info-table">
          <li className="flex">
            <p className="listTtl">Card Holder:</p>
            <div className="listItem">
              <TextField
                id="card-holder-field"
                hintText="John Smith"
                errorText={nameErrorText}
              />
            </div>
          </li>
          <li className="flex">
            <p className="listTtl">Billing Address:</p>
            <div className="listItem">
              <TextField
                id="address-field"
                hintText="123 New Orleans"
                errorText={addressErrorText}
              />
            </div>
          </li>
          <li className="flex">
            <p className="listTtl">E-mail:</p>
            <div className="listItem">
              <TextField
                id="email-field"
                hintText="test@example.com"
                errorText={emailErrorText}
              />
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
  }
}

CheckoutForm.propTypes = {
  stripe: PropTypes.shape({
    createToken: PropTypes.func.isRequired,
  }).isRequired,
  eventId: PropTypes.number.isRequired,
  jwt: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  nameErrorText: PropTypes.string.isRequired,
  addressErrorText: PropTypes.string.isRequired,
  emailErrorText: PropTypes.string.isRequired,
  creditCardError: PropTypes.bool.isRequired,
  setNameErrorText: PropTypes.func.isRequired,
  setAddressErrorText: PropTypes.func.isRequired,
  setEmailErrorText: PropTypes.func.isRequired,
  setChargeResponse: PropTypes.func.isRequired,
  setCreditCardError: PropTypes.func.isRequired,
};

export default injectStripe(CheckoutForm);
