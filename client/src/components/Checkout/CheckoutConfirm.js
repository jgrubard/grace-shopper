import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Addresses from '../Address/Addresses';
import ActiveOrder from '../Order/ActiveOrder';
import Dropdown from './Dropdown';

import { updateOrderOnServer } from '../../store';

class CheckoutConfirm extends Component {
  constructor(props) {
    super(props);
    this.state ={
      creditCardId: '',
      shippingId: '',
      billingId: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value * 1 })
  }

  onSave(ev) {
    ev.preventDefault();
    const { onUpdate, order, user } = this.props;
    const { creditCardId, shippingId, billingId } = this.state;
    const { id } = order;
    onUpdate({ id, isActive: false, date: Date.now(), userId: user.id, creditCardId, shippingId, billingId })
    onUpdate({ isActive: true, userId: user.id });
  }

  render() {
    const { handleChange, onSave } = this;
    const { ownAddresses, ownCards, user } = this.props;
    return (
      <div>
        <div className='row'>
          <div className='col'>
            <h5>Select Shipping Address:</h5>
            <Dropdown items={ownAddresses} title='Shipping Address' name='shippingId' handleChange={handleChange} />
          </div>
          <div className='col'>
            <h5>Select Billing Address:</h5>
            <Dropdown items={ownAddresses} title='Billing Address' name='billingId' handleChange={handleChange} />
          </div>
        </div>
        <Link to={`/users/${user.id}/addresses`}>
          <button className='btn btn-primary'>Add New Address</button>
        </Link>
          <br />
          <br />
        <h5>Select Credit Card:</h5>
          <Dropdown items={ownCards} title='Credit Card' name='creditCardId' handleChange={handleChange} />
            <Link to={`/users/${user.id}/creditCards`}>
              <button className='btn btn-info'>Add New Card</button>
            </Link>
          <ActiveOrder />
          <br />
          <button className='btn btn-success' onClick={ onSave }>Submit Payment</button>
      </div>
    );
  }

}

const mapState = ({ user, addresses, creditCards, orders }) => {
  const ownAddresses = addresses.filter(address => user.id === address.userId)
  const ownCards = creditCards.filter(card => card.userId === user.id)
  const order = orders.find(order => order.userId === user.id && order.isActive)
  return {
    user,
    ownAddresses,
    ownCards,
    order
  }
};

const mapDispatch = (dispatch) => {
  return {
    onUpdate: (order) => dispatch(updateOrderOnServer(order)),
  }
}

export default connect(mapState, mapDispatch)(CheckoutConfirm);
