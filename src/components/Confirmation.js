import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CheckIcon } from '../styles/Icons';
import '../styles/Confirmation.css';

const Confirmation = ({ jwt, history, chargeResponse }) => {
  if (!jwt) history.push('/');
  return (
    <main id="confirmation" className="restrict-width">
      <div className="flex center">
        <CheckIcon style={{ width: 60, height: 60, paddingRight: 10 }} />
        <h2 className="confirmationTtl">Your reservation is complete!</h2>
        <div className="grow" />
      </div>
      {chargeResponse ?
        <p className="note">
          {`Please save your order number: ${chargeResponse.order_id}`}
        </p> :
        null}
      <Link to={'/'} className="link">Go back to top</Link>
    </main>
  );
};

Confirmation.propTypes = {
  jwt: PropTypes.string,
  chargeResponse: PropTypes.shape(),
  history: PropTypes.shape(),
};

Confirmation.defaultProps = {
  jwt: undefined,
  chargeResponse: undefined,
  history: undefined,
};

export default Confirmation;
