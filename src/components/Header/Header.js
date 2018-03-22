import React from 'react';
import { Container, Form, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Menu borderless color="green" className="transparent " inverted attached>
      <Container>
        <Menu.Item>
          <NavLink to="/" className="josefin brand">
            Please
          </NavLink>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item className="p-0 mx-0 mb-0 mt-3">
            <Form>
              <Form.Group widths="equal" inline>
                <Form.Input
                  icon="at"
                  iconPosition="left"
                  placeholder="Email"
                  type="email"
                  className="white"
                  transparent
                  inverted
                  required
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  className="white"
                  inverted
                  transparent
                  required
                />
                <Form.Button basic inverted size="small">
                  Login
                </Form.Button>
              </Form.Group>
            </Form>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Header;
