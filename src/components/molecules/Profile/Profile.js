import React from 'react';
import PropTypes from 'prop-types';
import './Profile.css';

const Profile = ({ userProfile: { name, id, email } }) => (
  <table id="user-info-table">
    <tbody>
      <tr>
        <td>Name:</td>
        <td> { name } </td>
      </tr>
      <tr>
        <td>User ID:</td>
        <td> { id }</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td> { email } </td>
      </tr>
    </tbody>
  </table>
);

Profile.propTypes = {
  userProfile: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

Profile.defaultProps = {
  userProfile: {
    undefined,
    id: undefined,
    name: undefined,
    email: undefined,
  },
};

export default Profile;
