import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateLineItemOnServer, deleteLineItemFromServer } from '../../store';

class LineItemForm extends Component {
  constructor(props) {
    super(props);
    const { order, productId, orderItems, lineItemForProduct } = props;
    this.state = {
      quantity: lineItemForProduct ? lineItemForProduct.quantity : 1
    }
    this.onChangeLineItem = this.onChangeLineItem.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { lineItemForProduct } = nextProps
    this.setState({ quantity: lineItemForProduct ? lineItemForProduct.quantity : 1})
  }

  onChangeLineItem(ev) {
    this.setState({ quantity: ev.target.value * 1 });
  }

  onSave(ev) {
    ev.preventDefault();
    const { quantity } = this.state;
    const { id, productId, order } = this.props;
    const save = { id, productId, orderId: order.id, quantity };
    this.props.updateLineItem(save);
  }

  render() {
    const { quantity } = this.state;
    const { productId, deleteLineItem, page, id, product, addedToCart, lineItemForProduct, checkCart } = this.props;
    const { onChangeLineItem, onSave } = this;
    const active = page === 'active' ? true : false
    const itemExists = !!lineItemForProduct && !id;
    return (
      <div>
        <div>
          { product.quantity <= 0 ? (
              <h2 style={{color: 'red'}}>Out of Stock</h2>
            ) : (
            <div>
              <input
                type='number'
                className='form-control margin-b-10'
                value={quantity}
                placeholder='Select Quantity'
                onChange={onChangeLineItem}
              />
              <button disabled={quantity < 1 || quantity > product.quantity || itemExists} onClick={ onSave } className='btn btn-primary margin-b-10'>{active ? 'Update cart' : 'Add to cart'}</button>
            </div>
            )
          }
        </div>
        { lineItemForProduct && checkCart === 'product-page' ? <h3 style={{color:'red'}}>Added to Cart!</h3> : null }
        {
          active ? (
          <button
            className='btn btn-warning margin-b-10'
            onClick={() => deleteLineItem(id)}
          >
            Remove From Cart
          </button>
          ) : null
        }
      </div>
    )
  }
}

const mapState = ({ lineItems, orders, user, products }, { productId, orderId, page, id, itemId, checkCart }) => {
  const order = orders.find(order => {
    return !!user.id ? order.userId === user.id && order.status === 'cart' : !order.userId && order.status === 'cart'
  })
  const orderItems = order && lineItems.filter(item => item.orderId === order.id)
  const lineItemForProduct = orderItems && orderItems.find(item => item.productId === productId)
  const product = products.find(product => product.id === productId);
  const addedToCart = `${product.name} Added to Cart!`;
  return {
    order,
    productId,
    product,
    orderItems,
    lineItemForProduct,
    page,
    addedToCart,
    checkCart
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateLineItem: (lineItem) => dispatch(updateLineItemOnServer(lineItem)),
    deleteLineItem: (id) => dispatch(deleteLineItemFromServer(id))
  }
};

export default withRouter(connect(mapState, mapDispatch)(LineItemForm));
