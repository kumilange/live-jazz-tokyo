import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import { Paper, Divider } from 'material-ui';

import { formatPrice, isObjectEmpty } from '../../../utils';
import CheckoutForm from '../../../containers/molecules/CheckoutForm';
import './Pay.css';

const renderPayTable = (name, quantity, price) => (
  <div className="flex payment-table-row">
    <div className="payment-table-event">{name}</div>
    <div className="payment-table-quantity">{quantity}</div>
    <div className="payment-table-price">{price}</div>
  </div>
);

const Pay = ({ event, jwt, history, userProfile }) => {
  if (!jwt) history.push('/');
  return (
    !isObjectEmpty(event) && !isObjectEmpty(userProfile) ?
      <main className="restrict-width flex column center">
        <Paper className="payment-paper">
          { renderPayTable('Event Name', 'Quantity', 'Price') }
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          { renderPayTable(event.name, 'x1', `￥${formatPrice(event.price)}`) }
          <Divider style={{ marginTop: 10, marginBottom: 10, height: 1, backgroundColor: 'black' }} />
          { renderPayTable('Total:', '', `￥${formatPrice(event.price)}`) }
        </Paper>
        <Elements>
          <CheckoutForm />
        </Elements>
      </main> : null
  );
};

Pay.propTypes = {
  event: PropTypes.shape().isRequired,
  jwt: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  userProfile: PropTypes.shape().isRequired,
};

export default Pay;
