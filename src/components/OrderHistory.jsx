import React from 'react';
import formatPrice from '../utils/format';

export default (props) => (
  <table id="order-history-table">
    <tbody>
      <tr>
        <th>Order ID</th>
        <th>Title</th>
        <th>Amount</th>
      </tr>
      {
        props.orders.map((order) => {
          return (
            <tr key={ order.id }>
              <td> { order.id } </td>
              <td> { order.title }</td>
              <td> { formatPrice(order.amount) } yen</td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
);
