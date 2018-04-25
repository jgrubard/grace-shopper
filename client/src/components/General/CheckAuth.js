import React from 'react';
import { connect } from 'react-redux';

const CheckAuth = (Component) => {
  class AuthComponent extends React.Component {
    componentDidMount(nextProps) {
      this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.isAuthenticated) location.hash = '/login'
    }

    render() {
      const { isAuthenticated } = this.props
      return (
        <div>
          {isAuthenticated ? <Component {...this.props} /> : null }
        </div>
      )
    }
  }

  const mapState = ({ user }) => {
    const isAuthenticated = user.id ? true : false
    console.log(isAuthenticated)
    return { isAuthenticated }
  }

  return connect(mapState)(AuthComponent);
}

export default CheckAuth;
