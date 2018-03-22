import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Header, Message } from 'semantic-ui-react';

import { submitRegisterForm } from '../../actions';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, password } = this.state;
    const form = {
      email,
      password
    };
    this.props.submitRegisterForm(form);
    //this.setState({ submittedName: name, submittedEmail: email })
  };

  render() {
    const { email, password } = this.state;
    const { loading, error, message, success } = this.props.register;
    return (
      <div>
        <Header as="h1" color="grey" className="josefin">
          Register now for free!
        </Header>
        <Form
          onSubmit={this.handleSubmit}
          loading={loading}
          success={success}
          error={error}
          size="large"
        >
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="Your email address"
            name="email"
            value={email}
            onChange={this.handleChange}
            type="email"
            disabled={success}
            required
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            placeholder="Enter a password"
            type="password"
            required
            name="password"
            value={password}
            disabled={success}
            onChange={this.handleChange}
          />
          <Message success header="Welcome!" content={message} />
          <Message error header="Oops!" content={message} />
          <Form.Button disabled={success} color="green" fluid size="large">
            Register
          </Form.Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ register }) {
  return { register };
}

export default connect(mapStateToProps, { submitRegisterForm })(RegisterForm);
