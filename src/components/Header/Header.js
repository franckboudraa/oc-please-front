import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavbarGuest from './NavbarGuest';
import NavbarUser from './NavbarUser';

class Header extends Component {
  render() {
    return this.props.auth.user ? <NavbarUser /> : <NavbarGuest />;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Header);
