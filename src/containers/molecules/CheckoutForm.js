import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { injectStripe } from 'react-stripe-elements';

import { setChargeResponse, getOrderHistory } from '../../actions';
import CheckoutForm from '../../components/molecules/CheckoutForm';

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class CheckoutFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      nameErrorText: '',
      addressErrorText: '',
      emailErrorText: '',
      creditCardError: false,
    };
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

  /* eslint-disable no-shadow */
  async handleStripeTransaction() {
    const { stripe, eventId, jwt, history, setChargeResponse, getOrderHistory } = this.props;
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
      getOrderHistory(jwt);
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
    return (
      <CheckoutForm
        {...this.props}
        {...this.state}
        setCreditCardError={this.setCreditCardError}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  jwt: state.user.jwt,
  eventId: state.event.eventDetails.id,
});

const mapDispatchToProps = dispath => bindActionCreators({
  setChargeResponse, getOrderHistory,
}, dispath);

const container = connect(mapStateToProps, mapDispatchToProps)(CheckoutFormContainer);
export default withRouter(injectStripe(container));
