import React from 'react';
import PropTypes from 'prop-types';

const Confirmation = props => (
  <main className="restrict-width">
    <h2>
      Your reservation is complete!
    </h2>
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
