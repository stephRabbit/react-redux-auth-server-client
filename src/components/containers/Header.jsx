import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item clearfix">
          <Link
            className="nav-link"
            to="/signout"
          >
            Sign out
          </Link>
        </li>
      );
    }
    else {
      // Return array of elements to avoid parent container
      // return[ el, el ] pass key
      return [
        <li className="nav-item clearfix" key={0}>
          <Link
            className="nav-link"
            to="/signin"
          >
            Sign in
          </Link>
        </li>,
        <li className="nav-item clearfix" key={1}>
          <Link
            className="nav-link"
            to="/signup"
          >
            Sign up
          </Link>
        </li>
      ];
    }
  }

  render() {
    console.log(this.props);
    return(
      <nav className="nav navbar-light clearfix">
        <Link
          className="navbar-brand"
          to="/"
        >
          Redux Auth
        </Link>
        <ul className="nav navbar-nav">
            {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, null)(Header);