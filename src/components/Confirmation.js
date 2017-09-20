import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Confirmation extends Component {
  render() {
    return (
      <div>
        <h3>
          Your reservation is complete!
        </h3>
        <div>
          Please save your confirmation details:
        </div>
        <div>
          { JSON.stringify(this.props.chargeResponse) }
        </div>
      </div>
    );
  }
}

Confirmation.propTypes = {
  chargeResponse: PropTypes.shape(),
};

Confirmation.defaultProps = {
  chargeResponse: undefined,
};

export default Confirmation;
