import React from 'react';

import NavbarGuest from './NavbarGuest';
import NavbarUser from './NavbarUser';

const Header = props => {
  return props.auth.user ? <NavbarUser /> : <NavbarGuest url={props.match.url} />;
};

export default Header;
