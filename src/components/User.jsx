import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/User.css';

class User extends Component {
  render() {
    return (
      <div>
        <div>ID { this.props.match.params.id }</div>
      </div>
    );
  }
}

User.propTypes = {
  
};

User.defaultProps = {
  
};

export default User;

