import React from 'react';

export default (props) => (
  <table id="user-info-table">
    <tbody>
      <tr>
        <td>Name:</td>
        <td>Code Chrysalis</td>
      </tr>
      <tr>
        <td>Username:</td>
        <td>{ props.id }</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td>code@chrysalis.io</td>
      </tr>
    </tbody>
  </table>
);
