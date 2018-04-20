/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer, getLineItemsFromServer, getOrdersFromServer, getProductsFromServer, getUsersFromServer } from '../store';
import Home from './Home';
import Categories from './Category/Categories';
import Products from './Product/Products';
import ProductInfo from './Product/ProductInfo';
import Users from './User/Users';

class App extends React.Component {
  componentDidMount() {
    const { getCategories, getProducts, getUsers, getOrders } = this.props
    getCategories()
    getProducts()
    getUsers()
    getOrders()
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={ NavBar } />
          <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/categories' component={Categories} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/products/:id' component={ProductInfo} />
            <Route exact path='/users' component={Users} />
          </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesFromServer()),
    getProducts: () => dispatch(getProductsFromServer()),
    getUsers: () => dispatch(getUsersFromServer()),
    getOrders: () => dispatch(getOrdersFromServer()),
  }
}

export default connect(null, mapDispatch)(App);
