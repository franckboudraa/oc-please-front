import React, { Component } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../../actions';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';

class NavbarUser extends Component {
  render() {
    const { auth: { user: { first_name } } } = this.props;
    return (
      <Menu borderless color="green" inverted attached>
        <Container>
          <Menu.Item>
            <Link to="/" className="josefin brand">
              Please
            </Link>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/">Requests Map</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/me/requests">My requests</NavLink>
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
                  <Image avatar src={faker.internet.avatar()} /> {first_name}
                </span>
              }
            >
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile" icon="user" text="My profile" />
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
