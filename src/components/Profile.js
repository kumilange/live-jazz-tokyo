import React from 'react';
import PropTypes from 'prop-types';

const Profile = props => (
  <table id="user-info-table">
    <tbody>
      <tr>
        <td>Name:</td>
        <td> { props.userProfile.name } </td>
      </tr>
      <tr>
        <td>User ID:</td>
        <td> { props.userProfile.id }</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td> { props.userProfile.email } </td>
      </tr>
    </tbody>
  </table>
);

Profile.propTypes = {
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
