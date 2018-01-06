import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import CheckoutForm from './CheckoutForm';
import formatPrice from '../utils/format';
import '../styles/Pay.css';

class Pay extends Component {
  render() {
    return (
      <main className="restrict-width flex column center">
        <Paper className="payment-paper">
          <div className="flex payment-table-row">
            <div className="payment-table-cell1">Event Name</div>
            <div className="payment-table-cell2">Quantity</div>
            <div className="payment-table-cell3">Price</div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div className="flex payment-table-row">
            <div className="payment-table-cell1">{this.props.event.name}</div>
            <div className="payment-table-cell2">{'x1'}</div>
            <div className="payment-table-cell3">{ formatPrice(this.props.event.price) }</div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10, height: 1, backgroundColor: 'black' }} />
          <div className="flex payment-table-row">
            <div className="payment-table-cell1">{'Total:'}</div>
            <div className="payment-table-cell2" />
            <div className="payment-table-cell3">{ formatPrice(this.props.event.price)}</div>
          </div>
        </Paper>
        <Elements>
          <CheckoutForm
            jwt={this.props.jwt}
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
            setChargeResponse={this.props.setChargeResponse}
            history={this.props.history}
          />
        </Elements>
      </main>
    );
  }
}

Pay.propTypes = {
  event: PropTypes.shape().isRequired,
  jwt: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  userProfile: PropTypes.shape().isRequired,
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

export default Pay;
