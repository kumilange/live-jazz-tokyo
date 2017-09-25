import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/User.css';

class User extends Component {
  render() {
    return (
      <main className="flex column center">
        <div className="flex center restrict-width">
          <div id="profile-picture">
            <img src="/default-user.jpg" />
          </div>
          <table id="user-info-table">
            <tbody>
              <tr>
                <td>Name:</td>
                <td>Code Chrysalis</td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>{ this.props.match.params.id }</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>code@chrysalis.io</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex grow" />
      </main>
    );
  }
}

User.propTypes = {
  
};

User.defaultProps = {
  
};

export default User;

