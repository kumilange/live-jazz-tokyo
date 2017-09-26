import React from 'react';

export default (props) => (
  <table id="order-history-table">
    <tbody>
      <tr>
        <th>Order ID</th>
        <th>Title</th>
        <th>Amount</th>
      </tr>
      {
        this.props.orders.map((order) => {
          <tr>
            <td> { order.id } </td>
            <td> { order.eventName }</td>
            <td> { order.price } </td>
          </tr>
        })
      }
    </tbody>
  </table>
);
