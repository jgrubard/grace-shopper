import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLineItemOnServer } from '../../store';

class LineItemForm extends Component {
  constructor(props) {
    super(props);
    const { productId, orderId, lineItems } = props;
    let lineItem = lineItems.find(lineItem => lineItem.productId === productId && lineItem.orderId === orderId)

    console.log(orderId)

    this.state = {
      id: lineItem ? lineItem.id : '',
      orderId: orderId ? orderId : '',
      productId: productId,
      quantity: 1
    }
    this.onChangeLineItem = this.onChangeLineItem.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { id, orderId, productId, quantity } = nextProps;
    this.setState({ id, orderId, productId, quantity });
  }

  onChangeLineItem(ev) {
    this.setState({ quantity: ev.target.value * 1 });
  }

  onSave(ev) {
    ev.preventDefault();
    this.props.updateLineItem(this.state);
    // this.setState({ id, orderId, productId, quantity });
  }

  render() {

    console.log(this.state)

    const { quantity } = this.state;
    const { productId, orderId, priceMap } = this.props;
    const { onChangeLineItem, onSave } = this;
    const quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const existingQuantity = orderId ? quantity : '';
    const buttonText = orderId ? 'Change Quantity' : 'Add to Cart';
    // const total = priceMap[productId] * quantity;
    return (
      <div>
        <form onSubmit={onSave}>
          <select
            className = 'form-control'
            name = 'quantity'
            value = {quantity}
            onChange = {onChangeLineItem}
            style={{ marginBottom: '10px' }}
          >
            <option value=''>Select Quantity</option>
            {
              quantityArray.map(quantity => {
                return (
                  <option key = {quantity} value = {quantity}>{quantity}</option>
                )
              })
            }
          </select>
          <button style={{ marginBottom: '10px' }} className='btn btn-primary'>{buttonText}</button>
        </form>
        {/*<h6> {orderId ? 'Total Price: ' : '' } {orderId ? total : ''} </h6>*/}
      </div>
    )

  }
}

const mapState = ({ lineItems, orders, user }, { productId, orderId }) => {
  const order = orders.find(order => order.userId === user.id && order.isActive);
  return {
    orderId: order.id ? order.id : orderId,
    productId,
    lineItems
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateLineItem: (lineItem) => dispatch(updateLineItemOnServer(lineItem))
  }
};

export default connect(mapState, mapDispatch)(LineItemForm);
