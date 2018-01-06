import React from 'react';

export default props => (
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
