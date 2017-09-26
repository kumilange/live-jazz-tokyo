import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

import '../styles/Pay.css';

class Pay extends Component {
  render() {
    return (
      <main className="restrict-width">
        <TextField 
          floatingLabelText="Email"
        />
      </main>
    );
  }
}

Pay.propTypes = {
  
};

Pay.defaultProps = {
  
};

export default Pay;
