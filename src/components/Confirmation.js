import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Confirmation extends Component {
  render() {
    return (
      <div>
        <h3>
          Your reservation is complete!
        </h3>
        {this.props.chargeResponse ?
          <div>
            {`Please save your order number: ${this.props.chargeResponse.order_id}`}
          </div> :
          <div />}
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
