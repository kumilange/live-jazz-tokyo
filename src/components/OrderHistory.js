import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';

const OrderHistory = props => (
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
            <tr key={order.id}>
              <td> { order.id } </td>
              <td> <Link className="link" to={`/event/${order.eventId}`}>{ order.title }</Link></td>
              <td> ￥{ formatPrice(order.amount) } </td>
            </tr>
          );
        })
      }
    </tbody>
  </table>
);

OrderHistory.propTypes = {
  orders: PropTypes.arrayOf(Object),
};

OrderHistory.defaultProps = {
  orders: [],
};

export default OrderHistory;
