import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import CheckoutForm from './CheckoutForm';
import { formatPrice } from '../utils/format';
import '../styles/Pay.css';

const Pay = ({ event, jwt, history, userProfile, nameErrorText, addressErrorText, emailErrorText, creditCardError, setNameErrorText, setAddressErrorText, setEmailErrorText, setChargeResponse, setCreditCardError }) => {
  if (!jwt) history.push('/');
  return (
    event && userProfile ?
      <main className="restrict-width flex column center">
        <Paper className="payment-paper">
          <div className="flex payment-table-row">
            <div className="payment-table-cell1">Event Name</div>
            <div className="payment-table-cell2">Quantity</div>
            <div className="payment-table-cell3">Price</div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div className="flex payment-table-row">
            <div className="payment-table-cell1">{event.name}</div>
            <div className="payment-table-cell2">{'x1'}</div>
            <div className="payment-table-cell3">￥{formatPrice(event.price)}</div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10, height: 1, backgroundColor: 'black' }} />
          <div className="flex payment-table-row">
            <div className="payment-table-cell1">{'Total:'}</div>
            <div className="payment-table-cell2" />
            <div className="payment-table-cell3">￥{formatPrice(event.price)}</div>
          </div>
        </Paper>
        <Elements>
          <CheckoutForm
            jwt={jwt}
            userProfile={userProfile}
            eventId={event.id}
            creditCardError={creditCardError}
            setCreditCardError={setCreditCardError}
            nameErrorText={nameErrorText}
            addressErrorText={addressErrorText}
            emailErrorText={emailErrorText}
            setNameErrorText={setNameErrorText}
            setAddressErrorText={setAddressErrorText}
            setEmailErrorText={setEmailErrorText}
            setChargeResponse={setChargeResponse}
            history={history}
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
