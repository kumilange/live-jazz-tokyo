import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Elements, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import TextField from 'material-ui/TextField';

import '../styles/Pay.css';

class Pay extends Component {
  render() {
    return (
      <main className="restrict-width">
        <Elements>
          <table id="payment-info-table">
            <tbody>
              <tr>
                <td>Card Number:</td>
                <td><CardNumberElement /></td>
              </tr>
              <tr>
                <td>Expiry Date:</td>
                <td><CardExpiryElement /></td>
              </tr>
              <tr>
                <td>CVC:</td>
                <td><CardCVCElement /></td>
              </tr>
              <tr>
                <td>Email:</td>
                <td><TextField hintText="test@example.com" /></td>
              </tr>
            </tbody>
          </table>
          
        </Elements>
      </main>
    );
  }
}

Pay.propTypes = {
  
};

Pay.defaultProps = {
  
};

export default Pay;
