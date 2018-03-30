import React, { Component } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../actions';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';

class NavbarUser extends Component {
  render() {
    const { auth: { user: { first_name } } } = this.props;
    return (
      <Menu borderless color="green" inverted attached>
        <Container>
          <Menu.Item>
            <NavLink to="/" className="josefin brand">
              Please
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Pending requests</Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <NavLink to="/requests/new">
                <Button basic inverted>
                  Create a request
                </Button>
              </NavLink>
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
                <Dropdown.Item
                  as={Link}
                  to="/profile"
                  icon="user"
                  text="My profile"
                />
                <Dropdown.Item
                  as={Link}
                  to="/settings"
                  icon="setting"
                  text="Settings"
                />
                <Dropdown.Item
                  icon="log out"
                  onClick={() => this.props.logout()}
                  text="Logout"
                />
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
