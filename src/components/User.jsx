import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/User.css';

class User extends Component {
  render() {
    return (
      <div>
        <div id="profile-picture">
          <img src="/default-user.jpg" />
        </div>
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

