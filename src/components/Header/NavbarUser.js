import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Gravatar from 'react-gravatar';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../../actions';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';

class NavbarUser extends Component {
  render() {
    const { auth: { user: { id, first_name, last_name, email } } } = this.props;
    return (
      <Menu fluid stackable borderless color="green" inverted attached>
        <Container>
          <Menu.Item>
            <Link to="/" className="brand">
              Please
            </Link>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/">Requests Map</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/me/requests">My requests</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/me/proposals">My proposals</NavLink>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button basic inverted as={Link} to="/requests/new">
                Create a request
              </Button>
            </Menu.Item>
            <Dropdown
              item
              trigger={
                <span>
                  <Gravatar email={email} className="ui avatar image" /> {first_name} {last_name}
                </span>
              }
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/u/${id}/${_.kebabCase(first_name + '-' + last_name)}`}
                  icon="user"
                  text="My profile"
                />
                <Dropdown.Item as={Link} to="/settings" icon="setting" text="Settings" />
                <Dropdown.Item icon="log out" onClick={() => this.props.logout()} text="Logout" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { logout })(NavbarUser);
