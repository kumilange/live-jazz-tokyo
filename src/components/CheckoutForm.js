import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { TextField, RaisedButton, Dialog } from 'material-ui';

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
// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = {
      nameErrorText: '',
      addressErrorText: '',
      emailErrorText: '',
      creditCardError: false,
    };
  }

  componentDidMount() {
    this.setCreditCardError = this.setCreditCardError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setCreditCardError() {
    this.setState({ creditCardError: !this.state.creditCardError });
  }

  validateCardHolder() {
    let error = false;
    if (document.getElementById('card-holder-field').value === '') {
      this.setState({ nameErrorText: 'Card holder name is required' });
      error = true;
    } else {
      this.setState({ nameErrorText: '' });
    }
    if (document.getElementById('address-field').value === '') {
      this.setState({ addressErrorText: 'Billing address is required' });
      error = true;
    } else {
      this.setState({ addressErrorText: '' });
    }
    if (document.getElementById('email-field').value === '') {
      this.setState({ emailErrorText: 'E-mail address is required' });
      error = true;
    } else if (!EMAIL_REGEX.test(document.getElementById('email-field').value)) {
      this.setState({ emailErrorText: 'E-mail address is not valid' });
      error = true;
    } else {
      this.setState({ emailErrorText: '' });
    }
    return error;
  }

  async handleStripeTransaction() {
    const { stripe, eventId, jwt, history, setChargeResponse } = this.props;
    const resToken = await stripe.createToken({
      name: document.getElementById('card-holder-field').value,
    });
    const stripeToken = resToken.token;

    if (!stripeToken) {
      this.setCreditCardError();
      return;
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Bearer', jwt);
    const res = await (await fetch('/api/charge', {
      method: 'POST',
      headers,
      body: JSON.stringify({ stripeToken, eventId }),
    })).json();

    if (res.OK) {
      setChargeResponse(res);
      history.push('/confirmation');
    } else {
      this.setCreditCardError();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const error = this.validateCardHolder();
    if (!error) {
      this.handleStripeTransaction();
    }
  }

  render() {
    const { nameErrorText, addressErrorText, emailErrorText, creditCardError } = this.state;
    const actions = [
      <RaisedButton
        primary
        label="OK"
        onClick={this.setCreditCardError}
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
                <CardNumberElement style={stripeStyle} />
              </div>
            </div>
          </li>
          <li className="flex">
            <p className="listTtl">Expiry Date:</p>
            <div id="expiry-date" className="listItem">
              <div className="underline">
                <CardExpiryElement style={stripeStyle} />
              </div>
            </div>
            <p id="cvc">CVC:</p>
            <div className="listItem">
              <div className="underline">
                <CardCVCElement style={stripeStyle} />
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
          onRequestClose={this.setCreditCardError}
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
  setChargeResponse: PropTypes.func.isRequired,
};

export default injectStripe(CheckoutForm);
