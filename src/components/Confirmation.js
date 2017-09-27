import React from 'react';
import PropTypes from 'prop-types';
import { CheckIcon } from '../styles/Icons';

const Confirmation = props => (
  <main className="restrict-width">
    <div className="flex center">
      <CheckIcon style={{ width: 60, height: 60, paddingRight: 10 }} />
      <h2>Your reservation is complete!</h2>
      <div className="grow" />
    </div>
    {props.chargeResponse ?
      <p>
        {`Please save your order number: ${props.chargeResponse.order_id}`}
      </p> :
      null}
  </main>
);

Confirmation.propTypes = {
  chargeResponse: PropTypes.shape(),
};

Confirmation.defaultProps = {
  chargeResponse: undefined,
};

export default Confirmation;
