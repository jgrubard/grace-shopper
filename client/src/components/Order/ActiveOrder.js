import React from 'react';
import { connect } from 'react-redux';
import UserNav from './../User/UserNav';

import OrderCard from './OrderCard';
// import LineItemForm from '../Product/LineItemForm.js'

const ActiveOrder = ({ activeOrder, user, checkout }) => {
  // console.log(activeOrder)
  if (!activeOrder) return null
  return (
    <div>
      { checkout ? null : <UserNav user={ user } /> }
      <h2>Cart</h2>
      <OrderCard page={'active'} order={activeOrder} checkout={ false } />
    </div>
  )
}

const mapState = ({ orders, user }, { checkout }) => {
  // console.log(user)
  // console.log('order :', orders.filter(order => order.userId === user.id))
  const activeOrder = !!user.id ? (
      orders.find(order => order.userId === user.id && order.status === 'cart')
    ) : (
      orders.find(order => !order.userId && order.status === 'cart')
    )
  return { activeOrder, user, checkout }
}

export default connect(mapState)(ActiveOrder)
