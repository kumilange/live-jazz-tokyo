import React from 'react';
import formatPrice from '../utils/format';
import { Link } from 'react-router-dom';

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
              <td> <Link className="link" to={`/event/${order.eventId}`}>{ order.title }</Link></td>
              <td> ￥{ formatPrice(order.amount) } </td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
);
