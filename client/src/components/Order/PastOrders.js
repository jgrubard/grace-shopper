import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './OrderCard';

const PastOrders = ({ pastOrders }) => {
  return (
    <div>
      <h2>Past Orders</h2>
      { pastOrders.length ? null : ('No orders')}
      {
        pastOrders.map(order => (
          <div key={order.id}>
            <OrderCard page={'past'} order={order} />
            <hr />
          </div>
        ))
      }
    </div>
  )
}

const mapState = ({ orders, user }, { page }) => {
  const pastOrders = orders.filter(order => order.userId === user.id && !order.isActive)
  return { pastOrders }
}

export default connect(mapState)(PastOrders)
