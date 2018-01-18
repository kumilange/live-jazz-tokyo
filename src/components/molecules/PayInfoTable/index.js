import React from 'react';
import PropTypes from 'prop-types';
import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { TextField } from 'material-ui';

const stripeStyle = {
  base: {
    color: 'black',
    '::placeholder': {
      color: '#AAAC98',
    },
    fontSize: '16px',
    lineHeight: '24px',
  },
  complete: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  },
};

const renderPayInfoList = (contents, isSingleItem) => {
  return isSingleItem
    ? contents.map(({ no, title, item }) => {
      return (
        <li className="flex" key={no}>
          <p className="list-title">{title}</p>
          <div className="list-item">{item}</div>
        </li>
      );
    })
    : <li className="flex">
      { contents.map(({ title, item }) => [title, item])}
    </li>;
};

const getSingleListContents = ({ nameErrorText, addressErrorText, emailErrorText }) => [
  {
    no: 1,
    title: 'Card Holder:',
    item: <TextField
      id="card-holder-field"
      hintText="John Smith"
      errorText={nameErrorText}
    />,
  },
  {
    no: 2,
    title: 'Billing Address:',
    item: <TextField
      id="address-field"
      hintText="123 New Orleans"
      errorText={addressErrorText}
    />,
  },
  {
    no: 3,
    title: 'E-mail:',
    item: <TextField
      id="email-field"
      hintText="test@example.com"
      errorText={emailErrorText}
    />,
  },
  {
    no: 4,
    title: 'Card Number:',
    item: <div className="underline">
      <CardNumberElement style={stripeStyle} />
    </div>,
  },
];

const getMultListContents = () => [
  {
    no: 1,
    title: <p className="list-title">Expiry Date:</p>,
    item: <div className="list-item">
      <div id="expiry-date" className="underline">
        <CardExpiryElement style={stripeStyle} />
      </div>
    </div>,
  },
  {
    no: 2,
    title: <p id="cvc">CVC:</p>,
    item: <div className="list-item">
      <div className="underline">
        <CardCVCElement style={stripeStyle} />
      </div>
    </div>,
  },
];

const PayInfoTable = ({ nameErrorText, addressErrorText, emailErrorText }) => {
  const singleListContents = getSingleListContents({ nameErrorText, addressErrorText, emailErrorText });
  const multListContents = getMultListContents();
  return (
    <ul id="payment-info-table">
      { renderPayInfoList(singleListContents, true) }
      { renderPayInfoList(multListContents, false) }
    </ul>
  );
};

PayInfoTable.propTypes = {
  nameErrorText: PropTypes.string.isRequired,
  addressErrorText: PropTypes.string.isRequired,
  emailErrorText: PropTypes.string.isRequired,
};

export default PayInfoTable;

