import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, Dialog } from 'material-ui';

import PayInfoTable from '../PayInfoTable';
import './CheckoutForm.css';

const CheckoutForm = ({ nameErrorText, addressErrorText, emailErrorText, creditCardError, setCreditCardError, handleSubmit }) => {
  const actions = [
    <RaisedButton
      primary
      label="OK"
      onClick={setCreditCardError}
    />,
  ];

  return (
    <form onSubmit={handleSubmit} className="flex column center">
      <PayInfoTable
        nameErrorText={nameErrorText}
        addressErrorText={addressErrorText}
        emailErrorText={emailErrorText}
      />
      <RaisedButton primary className="order-button" label="Confirm Order" type="submit" />
      <Dialog
        title="Error"
        actions={actions}
        modal={false}
        open={creditCardError}
        onRequestClose={setCreditCardError}
      >
        Please input a valid credit card.
      </Dialog>
    </form>
  );
};

CheckoutForm.propTypes = {
  nameErrorText: PropTypes.string.isRequired,
  addressErrorText: PropTypes.string.isRequired,
  emailErrorText: PropTypes.string.isRequired,
  creditCardError: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setCreditCardError: PropTypes.func.isRequired,
};

export default CheckoutForm;
