import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';

class NavbarUser extends PureComponent {
  render() {
    return (
      <Menu borderless color="green" inverted attached>
        <Container>
          <Menu.Item>
            <a href="/" className="josefin brand">
              Please
            </a>
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item text="Language">
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Russian</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
              <Button onClick={() => this.props.logout()}>Logout</Button>
            </Menu.Item>
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
