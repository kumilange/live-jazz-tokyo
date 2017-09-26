import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Elements, CardElement } from 'react-stripe-elements';
import TextField from 'material-ui/TextField';

import '../styles/Pay.css';

class Pay extends Component {
  render() {
    return (
      <main className="restrict-width">
        <Elements>
          <CardElement style={{base: {fontSize: '18px'}}} />
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
