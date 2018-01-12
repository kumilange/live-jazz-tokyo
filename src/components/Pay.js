import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import CheckoutForm from './CheckoutForm';
import { formatPrice } from '../utils/format';
import '../styles/Pay.css';

const Pay = (props) => {
  if (!props.jwt) props.history.push('/');
  return (
    props.event && props.userProfile ?
      <main className="restrict-width flex column center">
        <Paper className="payment-paper">
          <div className="flex payment-table-row">
            <div className="payment-table-cell1">Event Name</div>
            <div className="payment-table-cell2">Quantity</div>
            <div className="payment-table-cell3">Price</div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div className="flex payment-table-row">
            <div className="payment-table-cell1">{props.event.name}</div>
            <div className="payment-table-cell2">{'x1'}</div>
            <div className="payment-table-cell3">￥{formatPrice(props.event.price)}</div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10, height: 1, backgroundColor: 'black' }} />
          <div className="flex payment-table-row">
            <div className="payment-table-cell1">{'Total:'}</div>
            <div className="payment-table-cell2" />
            <div className="payment-table-cell3">￥{formatPrice(props.event.price)}</div>
          </div>
        </Paper>
        <Elements>
          <CheckoutForm
            jwt={props.jwt}
            userProfile={props.userProfile}
            eventID={props.event.id}
            creditCardError={props.creditCardError}
            setCreditCardError={props.setCreditCardError}
            nameErrorText={props.nameErrorText}
            addressErrorText={props.addressErrorText}
            emailErrorText={props.emailErrorText}
            setNameErrorText={props.setNameErrorText}
            setAddressErrorText={props.setAddressErrorText}
            setEmailErrorText={props.setEmailErrorText}
            setChargeResponse={props.setChargeResponse}
            history={props.history}
          />
        </Elements>
      </main> : null
  );
};

Pay.propTypes = {
  event: PropTypes.shape(),
  jwt: PropTypes.string,
  history: PropTypes.shape().isRequired,
  userProfile: PropTypes.shape(),
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

Pay.defaultProps = {
  event: undefined,
  jwt: undefined,
  userProfile: undefined,
};

export default Pay;
