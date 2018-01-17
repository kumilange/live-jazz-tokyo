import React from 'react';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';
import { Paper, Divider } from 'material-ui';

import { formatPrice, isObjectEmpty } from '../../../utils';
import CheckoutForm from '../../molecules/CheckoutForm';
import './Pay.css';

const Pay = ({ event, jwt, history, userProfile, setChargeResponse }) => {
  if (!jwt) history.push('/');
  return (
    !isObjectEmpty(event) && !isObjectEmpty(userProfile) ?
      <main className="restrict-width flex column center">
        <Paper className="payment-paper">
          <div className="flex payment-table-row">
            <div className="payment-table-event">Event Name</div>
            <div className="payment-table-quantity">Quantity</div>
            <div className="payment-table-price">Price</div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div className="flex payment-table-row">
            <div className="payment-table-event">{event.name}</div>
            <div className="payment-table-quantity">{'x1'}</div>
            <div className="payment-table-price">￥{formatPrice(event.price)}</div>
          </div>
          <Divider style={{ marginTop: 10, marginBottom: 10, height: 1, backgroundColor: 'black' }} />
          <div className="flex payment-table-row">
            <div className="payment-table-event">{'Total:'}</div>
            <div className="payment-table-quantity" />
            <div className="payment-table-price">￥{formatPrice(event.price)}</div>
          </div>
        </Paper>
        <Elements>
          <CheckoutForm
            jwt={jwt}
            userProfile={userProfile}
            eventId={event.id}
            setChargeResponse={setChargeResponse}
            history={history}
          />
        </Elements>
      </main> : null
  );
};

Pay.propTypes = {
  event: PropTypes.shape().isRequired,
  jwt: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  userProfile: PropTypes.shape().isRequired,
  setChargeResponse: PropTypes.func.isRequired,
};

export default Pay;
