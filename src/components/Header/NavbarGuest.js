import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Menu } from 'semantic-ui-react';
import { login } from '../../actions';

class NavbarGuest extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: ''
      }
    };
  }

  handleChange = (e, { name, value }) =>
    this.setState({ form: { ...this.state.form, [name]: value } });

  handleSubmit = () => {
    const { form } = this.state;
    this.props.login(form);
  };
  render() {
    const { form: { email, password } } = this.state;
    const { loading, error } = this.props.auth;
    return (
      <Menu borderless color="green" className="transparent " inverted attached>
        <Container>
          <Menu.Item>
            <a href="/" className="josefin brand">
              Please
            </a>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item className="p-0 mx-0 mb-0 mt-3">
              <Form
                loading={loading}
                error={error}
                onSubmit={this.handleSubmit}
              >
                <Form.Group widths="equal" inline>
                  <Form.Input
                    error={error}
                    icon="at"
                    iconPosition="left"
                    placeholder="Email"
                    type="email"
                    className="white"
                    name="email"
                    transparent
                    inverted
                    required
                    value={email}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    error={error}
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    className="white"
                    name="password"
                    inverted
                    transparent
                    required
                    value={password}
                    onChange={this.handleChange}
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
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { login })(NavbarGuest);
