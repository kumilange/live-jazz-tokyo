import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CheckIcon } from '../styles/Icons';
import '../styles/Confirmation.css';

const Confirmation = props => (
  <main id="confirmation" className="restrict-width">
    <div className="flex center">
      <CheckIcon style={{ width: 60, height: 60, paddingRight: 10 }} />
      <h2 className="confirmationTtl">Your reservation is complete!</h2>
      <div className="grow" />
    </div>
    {props.chargeResponse ?
      <p className="note">
        {`Please save your order number: ${props.chargeResponse.order_id}`}
      </p> :
      null}
    <Link to={'/'} className="link">Go back to top</Link>
  </main>
);

Confirmation.propTypes = {
  chargeResponse: PropTypes.shape(),
};

Confirmation.defaultProps = {
  chargeResponse: undefined,
};

export default Confirmation;
