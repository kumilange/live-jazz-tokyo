import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { isObjectEmpty } from '../../../utils/index';
import { CheckIcon } from '../../atoms/Icon/Icon';
import './Confirmation.css';

const Confirmation = ({ jwt, history, chargeResponse }) => {
  if (!jwt) history.push('/');
  return (
    <main id="confirmation" className="restrict-width">
      <div className="flex center">
        <CheckIcon style={{ width: 60, height: 60, paddingRight: 10 }} />
        <h2 className="title">Your reservation is complete!</h2>
        <div className="grow" />
      </div>
      {!isObjectEmpty(chargeResponse) ?
        <p className="note">
          {`Please save your order number: ${chargeResponse.order_id}`}
        </p> :
        null}
      <Link to={'/'} className="link">Go back to top</Link>
    </main>
  );
};

Confirmation.propTypes = {
  jwt: PropTypes.string.isRequired,
  chargeResponse: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default Confirmation;
